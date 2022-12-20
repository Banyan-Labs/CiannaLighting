import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";
import bcrypt from "bcrypt";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  User.findOne({ email })
    .select("+password")
    .then(async (user) => {
      if (!user) res.status(404).json({ message: "User not found" });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const role = user.role;

          const accessToken = jwt.sign(
            {
              name: user.email,
              role,
            },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "1d" }
          );

          const refreshToken = jwt.sign(
            { name: user.email, role },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: "2d" }
          );
          user.refreshToken = refreshToken;

          user
            .save()
            .then((authenticatedUser) => {

              res.cookie("jwt", refreshToken, {
                httpOnly: true,
                sameSite: "none",
                path: "/",
                secure: true,
              });
              res.json({
                accessToken,
                user: {
                  _id: authenticatedUser._id,
                  name: authenticatedUser.name,
                  email: authenticatedUser.email,
                  role: authenticatedUser.role,
                },
              });
            })
            .catch((error) => {
              console.log(error.message);
              res.sendStatus(401);
            });
        } else {
          res
            .status(401)
            .json({ message: "The password you entered is incorrect." });
        }
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getUser = async (req: Request, res: Response) => {
  const { _id, emailChange, password, passwordChange, name, update } =
    req.body;
  await User.findOne({ _id })
    .select("+password")
    .then(async (authUser) => {
      if (authUser != null) {
        if (update === true) {
          const match = await bcrypt.compare(password, authUser.password);
          if (match) {
            if (passwordChange) {
              const newHashedPassword = await bcrypt.hash(passwordChange, 10);
              authUser.password = newHashedPassword;
            }
            if (emailChange) {
              authUser.email = emailChange;
            }
            if (name) {
              authUser.name = name;
            }
            authUser.save();
          } else {
            res.status(500).json({
              message: "Password is incorrect.",
            });
          }
        }
      }
      return res.status(200).json({
        authUser,
        message: `Don't forget you're new password if you changed it ${authUser?.name}!`,
      });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500).json({
        message: error.message,
      });
    });
};

const logOut = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  const refreshToken = cookies.jwt;
  console.log(refreshToken);

  if (!cookies.jwt) return res.sendStatus(204);

  await User.findOne({ refreshToken })
    .select("+refreshToken")
    .then((user) => {
      console.log(user);
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

export default { login, logOut, getUser };
