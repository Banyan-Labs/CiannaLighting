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
      res.status(500);
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
      console.log(user);
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          user.isAuth = true;
          const accessToken = jwt.sign(
            { name: user.email },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '1000s' }
          );

          const refreshToken = jwt.sign(
            { name: user.email },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: '1d' }
          );

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
              res.status(401);
            });
        }
      } else {
        res
          .status(401)
          .json({ message: 'The password you entered is incorrect.' });
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

const logOut = async (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  //   const name: string = req.body.name;
  await User.findOne({ email: email })
    .exec()
    .then((user) => {
      if (user) {
        user.isAuth = false;
        user.save();

        return res.status(200).json({
          User: {
            name: user?.name,
            email: user?.email,
            id: user?._id,
            isAuth: user?.isAuth,
          },
        });
      } else {
        next();
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
