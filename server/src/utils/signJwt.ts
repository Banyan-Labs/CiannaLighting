import jwt from "jsonwebtoken";

import config, { EnvVars } from "../config";

type ArgsType = { email: string; role: string };
type ReturnType = { accessToken: string; refreshToken: string };

export const signJwt = ({ email, role }: ArgsType): ReturnType => {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET }: EnvVars = config;
  const user = { name: email, role: role };

  return {
    accessToken: jwt.sign({ ...user }, ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    }),
    refreshToken: jwt.sign({ ...user }, REFRESH_TOKEN_SECRET, {
      expiresIn: "2d",
    }),
  };
};
