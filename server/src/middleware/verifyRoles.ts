import { Request, Response, NextFunction } from 'express';

const verifyRoles = (...allowedRoles: string[]) => {
  // By passing this in as middleware on the route, you restrict access to that route with the role or roles you pass in as the argument.
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req?.body.role) return res.sendStatus(401);
    const roleArray = [...allowedRoles];
    const result = roleArray.find((role) => role === req.body.role);
    console.log(result);
    if (!result) return res.sendStatus(401);
    next();
  };
};

export default verifyRoles;