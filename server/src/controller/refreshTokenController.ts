import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();
import User from '../model/User';

const refreshToken = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  User.findOne({ refreshToken }).then((user) => {
    if (!user) return res.sendStatus(401);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err: any, token: any) => {
        if (err || user.email !== token.name) return res.sendStatus(403);
        const accessToken = jwt.sign(
          { name: user.email },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: '1500s' }
        );
        res.json({ accessToken });
      }
    );
  });
};

export default refreshToken;
