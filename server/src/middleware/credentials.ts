import { Request, NextFunction } from "express";

import allowedOrigins from "../../config/domainOrigins";

const credentials = (req: Request, res: any, next: NextFunction) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }

  next();
};

export default credentials;
