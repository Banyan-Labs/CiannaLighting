import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../model/User";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  let { name, email, password } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password,
    isAuth: false
  });
  return user
    .save()
    .then((result) => {
      return res.status(201).json({
        user: result,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  await User.findOne({ email: email, password: password })
    .exec()
    .then((user) => {
      if(user){
        user.isAuth = true;
        user.save()
        
        return res.status(200).json({
            User: {
                name: user?.name,
                email: user?.email,
                id: user?._id,
                isAuth: user?.isAuth,
            },
        });
        
    }else{
        next()
    }
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};
const logOut = async (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  await User.findOne({ email: email})
    .exec()
    .then((user) => {
      if(user){
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
    }else{
        next()
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

export default { getAllUsers, createUser, login, logOut};
