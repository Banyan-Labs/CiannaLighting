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

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    console.log(email, password, "params")
   await User.findOne({email: email, password: password})
        .exec()
        .then((results)=>{
            console.log(results,res, 'weird')
            return res.status(200).json({
                user: {
                    name: results?.name,
                    email: results?.email,
                    id: results?._id,
                    isAuth: results?.isAuth 
                }
            })
        })
        .catch((error) => {
            console.log(error.message)
            return res.status(500).json({
              message: error.message,
              error,
            });
        });


}

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

export default { getAllUsers, createUser, getUser };
