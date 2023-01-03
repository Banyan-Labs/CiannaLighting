import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import User from "../model/User";

export interface RefreshTokenType {
  name: string;
}

const refreshTokenController = (req: Request, res: Response) => {
  const cookies = req.cookies;
  console.log(cookies, "refresh controller");
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken: string = cookies.jwt;

  User.findOne({ refreshToken })
    .then((user) => {
      if (!user) return res.sendStatus(401);
      console.log("USER on REFRESH: ", user);
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err: any, token: any) => {
          if (err || user.email !== token.name) return res.sendStatus(403);
          const role = user.role;
          const accessToken = jwt.sign(
            { name: user.email, role },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "1d" }
          );
          res.json({
            accessToken,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        }
      );
    })
    .catch((err) => console.log("Error in refresh: ", err));
};

export default { refreshTokenController };
