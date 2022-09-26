import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";
const bcrypt = require("bcrypt");

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
            { expiresIn: "1500s" }
          );

          const refreshToken = jwt.sign(
            { name: user.email },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: "30d" }
          );
          user.isAuth = true;
          user.refreshToken = refreshToken;

          user
            .save()
            .then((authenticatedUser) => {
              res.cookie("jwt", refreshToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                path: "/",
                maxAge: 24 * 60 * 60 * 1000,
              });
              res.json({
                accessToken,
                user: {
                  _id: authenticatedUser._id,
                  name: authenticatedUser.name,
                  email: authenticatedUser.email,
                  refreshToken: authenticatedUser.refreshToken,
                  isAuth: authenticatedUser.isAuth,
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
  const { email } = req.body;

  await User.findOne({ email })
    .then((authUser) => {
      return res.status(200).json({ authUser });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
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

      if (user) {
        user.refreshToken = "";
        user.isAuth = false;
        user.save();

        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.sendStatus(204);
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { login, logOut, getUser };
