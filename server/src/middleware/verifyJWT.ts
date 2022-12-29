import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
export interface TokenType {
  name: string;
  role: string;
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, token: TokenType) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      req.body.authEmail = token.name;
      req.body.authRole = token.role;
      next();
    }
  );
};

export default verifyJWT;
