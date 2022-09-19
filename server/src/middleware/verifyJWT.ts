require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyJWT = (req: any, res: any, next: any) => {
  //   console.log(body); // remember to type out this
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, token: any) => {
    //   console.log(token); // REMEMBER TO FIND TYPE AND MAKE SURE YOUR TYPE OUT THE TOKEN!!!
    console.log(token);
    if (err) return res.status(403);
    req.body.email = token.name;
    next();
  });
};

export default verifyJWT;
