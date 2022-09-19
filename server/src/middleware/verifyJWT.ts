require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, token: any) => {
    if (err) return res.sendStatus(403);
    req.body.email = token.name;
    next();
  });
};

export default verifyJWT;
