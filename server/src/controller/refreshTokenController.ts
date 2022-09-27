import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import User from "../model/User";

export interface RefreshTokenType {
  name: string;
}

const refreshTokenController = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken: string = cookies.jwt;

  User.findOne({ refreshToken })
    .then((user) => {
      if (!user) return res.sendStatus(401);

      if (refreshToken) {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET as string,
          (err: any, token: any) => {
            if (err || user.email !== token.name) return res.sendStatus(403);
            const role = user.role;
            const accessToken = jwt.sign(
              { name: user.email, role },
              process.env.ACCESS_TOKEN_SECRET as string,
              { expiresIn: "1500s" }
            );
            res.json({ accessToken });
          }
        );
      }
    })
    .catch((err) => console.log(err));
};

export default { refreshTokenController };
