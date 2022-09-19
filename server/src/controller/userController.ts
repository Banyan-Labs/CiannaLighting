import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../model/User';
require('dotenv').config();
const bcrypt = require('bcrypt');

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: 'Please fill in all required fields' });

  await User.findOne({ email })
    .then(async (existingUser) => {
      if (existingUser) {
        res
          .status(400)
          .json({ message: 'An account with this email already exists' });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          name,
          email,
          role: 'USER',
          password: hashedPassword,
          isAuth: false,
        });

        newUser
          .save()
          .then((result) => {
            res.status(201).json({
              user: {
                name: result.name,
                email: result.email,
                isAuth: result.isAuth,
                role: result.role,
              },
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ message: error.message });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required' });

  User.findOne({ email })
    .select('+password')
    .then(async (user) => {
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const accessToken = jwt.sign(
            { name: user.email },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '1500s' }
          );

          const refreshToken = jwt.sign(
            { name: user.email },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: '30d' }
          );
          user.isAuth = true;
          user.refreshToken = refreshToken;

          user
            .save()
            .then((authenticatedUser) => {
              res.cookie('jwt', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
              });
              res.json({ accessToken, user: authenticatedUser });
            })
            .catch((error) => {
              console.log(error.message);
              res.sendStatus(401);
            });
        } else {
          res
            .status(401)
            .json({ message: 'The password you entered is incorrect.' });
        }
      }
    })
    .catch((error) => {
      console.log(
        'something went terribly wrong. omg no, the world, my world is falling apart..'
      );
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const logOut = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  const refreshToken = cookies.jwt;

  if (!cookies.jwt) return res.sendStatus(204);
  await User.findOne({ refreshToken })
    .select('+refreshToken')
    .then((user) => {
      if (!user) {
        res.clearCookie('jwt', {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
        return res.sendStatus(204);
      }

      if (user) {
        // remember to remove from front end as well.
        user.refreshToken = '';
        user.isAuth = false;
        user.save();

        res.clearCookie('jwt', {
          httpOnly: true,
          sameSite: 'none',
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

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .exec()
    .then((results) => {
      return res.status(200).json({
        users: results,
        count: results.length,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { getAllUsers, createUser, login, logOut };
