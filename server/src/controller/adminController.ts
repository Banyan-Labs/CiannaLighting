import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../model/User';
require('dotenv').config();
const bcrypt = require('bcrypt');

const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { name, email, password, role } = req.body;

  if (!name || !email || !password || !role)
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
          role,
          password: hashedPassword,
          isAuth: false,
        });

        newUser
          .save()
          .then((result) => {
            res.status(201).json({
              user: {
                _id: result.id,
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

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .exec()
    .then((results) => {
      return res.status(200).json({
        users: results,
        count: results.length,
      });
    });
};

export default { createNewUser, getAllUsers };