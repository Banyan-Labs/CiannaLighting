import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../model/User";
import { signJwt } from "../utils/signJwt";
import { createLogAtSignIn } from "./activityController";
import logging from "../../config/logging";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const thisUser = await User.findOne({ email }).select("+password");

    if (!thisUser) {
      return res.status(404).json({ message: "User not found" });
    } else if (!thisUser?.isActive) {
      return res.status(401).json({ message: "User is not active" });
    } else if (thisUser && thisUser.isActive) {
      if (!bcrypt.compareSync(password, thisUser.password)) {
        return res.status(401).json({ message: "Invalid password" });
      } else {
        const JWT = signJwt({ email: thisUser.email, role: thisUser.role });
        thisUser.refreshToken = JWT.refreshToken;
        const authUser = await thisUser.save();

        if (authUser) {
          const { _id, name, email, role } = authUser;

          await createLogAtSignIn(req.ip, _id, role, name);

          res.cookie("jwt", JWT.refreshToken, {
            httpOnly: true,
            sameSite: "none",
            path: "/",
            secure: true,
          });

          res.status(200).json({
            accessToken: JWT.accessToken,
            message: "Login successful",
            user: { _id, name, email, role },
          });
        }
      }
    }
  } catch (error: any) {
    logging.error(error.message, "login");
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { _id, emailChange, passwordChange, name, role, isActive, update } = req.body;
  logging.info(`Recieved the following values from the client: _id = ${_id}, emailChange = ${emailChange}, passwordChange = ${passwordChange}, name = ${name}, role = ${role}, isActive = ${isActive}, update = ${update}`, "getUser");

  await User.findOne({ _id })
    .select("+password")
    .then(async (authUser) => {
      if (authUser != null) {
        logging.info(`Found the following user: ${JSON.stringify(authUser)}`, "getUser");
        if (update === true) {
          const match = passwordChange
            ? await bcrypt.compare(passwordChange, authUser.password)
            : "";
          const emailMatch = authUser.email === emailChange;
          const nameMatch = authUser.name === name;
          const roleMatch = authUser.role === role;
          const activeMatch = authUser.isActive === isActive;

          if (passwordChange && !match) {
            const newHashedPassword = await bcrypt.hash(passwordChange, 10);
            authUser.password = newHashedPassword;
          }

          if (emailChange && !emailMatch) {
            authUser.email = emailChange;
          }

          if (role && !roleMatch) {
            authUser.role = role;
          }

          if (name && !nameMatch) {
            authUser.name = name;
          }

          if (isActive != undefined && !activeMatch) {
            authUser.isActive = isActive;
          }

          await authUser.save();
        }

        return res.status(200).json({
          authUser,
          message: `Don't forget you're new password if you changed it ${authUser?.name}!`,
        });
      } else {
        return res.status(204).json({ message: `No user found using _id of #${_id}.` });
      }
    })
    .catch((error) => {
      logging.error(error.message, "getUser");
      res.sendStatus(500).json({
        message: error.message,
      });
    });
};

const logOut = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  const refreshToken = cookies.jwt;

  if (!refreshToken) {
    return res.sendStatus(204).json({ message: "No refresh token found in cookie." });
  }

  await User.findOne({ refreshToken })
    .select("+refreshToken")
    .then((user) => {
      if (!user) {
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        return res.sendStatus(204).json({ message: `No user found using refreshToken of #${refreshToken}.` });
      }

      user.refreshToken = "";
      user.save();
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.sendStatus(200);
    });
};

const addActiveColumnToUserAndSetToTrue = async (
  _req: Request,
  res: Response
) => {
  try {
    const allUsers = await User.find();

    allUsers.forEach((user) => {
      User.findByIdAndUpdate(
        user._id,
        {
          isActive: true,
        },
        (error, updatedUser) => {
          error
            ? logging.error(error.message, "addActiveColumnToUserAndSetToTrue")
            : logging.info(`Updated user: ${updatedUser}`, "addActiveColumnToUserAndSetToTrue");
        }
      );
    });

    return res.sendStatus(200);
  } catch (error: any) {
    logging.error(error.message, "addActiveColumnToUserAndSetToTrue");
    throw error;
  }
};

const addResetPassColumnToUserAndSetToFalse = async (
  _req: Request,
  res: Response
) => {
  try {
    const allUsers = await User.find();

    allUsers.forEach((user) => {
      User.findByIdAndUpdate(
        user._id,
        {
          resetPasswordRequest: false,
        },
        (error, updatedUser) => {
          error
            ? logging.error(error.message, "addResetPassColumnToUserAndSetToFalse")
            : logging.info(`Updated user: ${updatedUser}`, "addResetPassColumnToUserAndSetToFalse");
        }
      );
    });

    return res.sendStatus(200);
  } catch (error: any) {
    logging.error(error.message, "addResetPassColumnToUserAndSetToFalse");
    throw error;
  }
};

const editUser = async (req: Request, res: Response) => {
  type ReqBody = {
    name: string | undefined;
    emailChange: string | undefined;
    passwordChange: string | undefined;
    role: string | undefined;
  };
  const { name, emailChange, passwordChange, role }: ReqBody = req.body;
  const { userId } = req.params;

  try {
    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      if (name) {
        targetUser.name = name;
      }

      if (emailChange) {
        targetUser.email = emailChange;
      }

      if (passwordChange) {
        if (targetUser.resetPasswordRequest)
          targetUser.resetPasswordRequest = false;
        targetUser.password = bcrypt.hashSync(passwordChange, 10);
      }

      if (role) {
        targetUser.role = role;
      }

      await targetUser.save();

      return res
        .status(200)
        .json({ message: "User updated", data: targetUser });
    }
  } catch (error: any) {
    logging.error(error.message, "editUser");
    return res.status(500).json({ message: error.message });
  }
};

const toggleUserIsActive = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const currentStatus = targetUser.isActive;
      targetUser.isActive = !currentStatus;

      await targetUser.save();

      return res.status(200).json({
        message: `User ${targetUser.name} ${currentStatus ? "deactivated" : "activated"
          }`,
      });
    }
  } catch (error: any) {
    logging.error(error.message, "toggleUserIsActive");
    return res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const targetUser = await User.findOne({ email });

  if (!targetUser) {
    res.status(404).json({ message: "User not found" });
  } else {
    if (targetUser.resetPasswordRequest) {
      res.status(400).json({ message: "Password reset pending" });
    } else {
      targetUser.resetPasswordRequest = true;
      await targetUser.save();
      return res.status(200).json({ message: "Password reset request sent" });
    }
  }
};

export default {
  login,
  logOut,
  getUser,
  addActiveColumnToUserAndSetToTrue,
  editUser,
  toggleUserIsActive,
  addResetPassColumnToUserAndSetToFalse,
  resetPassword,
};
