import { NextFunction, Request, Response } from "express";
import User from "../model/User";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/signJwt";
import { createLogAtSignIn } from "./activityController";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    res.status(400).json({ message: "Username and password are required" });
  try {
    const thisUser = await User.findOne({ email }).select("+password");

    if (!thisUser) return res.status(404).json({ message: "User not found" });
    else if (thisUser && !thisUser?.isActive)
      return res.status(401).json({ message: "User is not active" });
    else if (thisUser && thisUser.isActive) {
      if (!bcrypt.compareSync(password, thisUser.password))
        return res.status(401).json({ message: "Invalid password" });
      else {
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
    console.error("🚀 ~ file: userController.ts:125 ~ login ~ error", error);
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { _id, emailChange, passwordChange, name, role, isActive, update } =
    req.body;
  console.log("body: ", req.body);
  await User.findOne({ _id })
    .select("+password")
    .then(async (authUser) => {
      if (authUser != null) {
        console.log("authUser update: ", authUser, update);
        if (update === true) {
          console.log("update in conditional: ", update);
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
        } else {
          next();
        }
      }
      return res.status(200).json({
        authUser,
        message: `Don't forget you're new password if you changed it ${authUser?.name}!`,
      });
    })
    .catch((error) => {
      res.sendStatus(500).json({
        message: error.message,
      });
    });
};

const logOut = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  const refreshToken = cookies.jwt;

  if (!cookies.jwt) return res.sendStatus(204);

  await User.findOne({ refreshToken })
    .select("+refreshToken")
    .then((user) => {
      if (!user) {
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        return res.sendStatus(204);
      }

      user.refreshToken = "";
      user.save();

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.sendStatus(204);
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
          error ? console.error(error) : console.log(updatedUser);
        }
      );
    });
    return res.sendStatus(200);
  } catch (error: any) {
    console.error(error);
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
          error ? console.error(error) : console.log(updatedUser);
        }
      );
    });
    return res.sendStatus(200);
  } catch (error: any) {
    console.error(error);
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
    console.log(error);
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
        message: `User ${targetUser.name} ${
          currentStatus ? "deactivated" : "activated"
        }`,
      });
    }
  } catch (error: any) {
    console.log(error);
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
