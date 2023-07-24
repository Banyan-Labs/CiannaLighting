import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../model/User";
import Project from "../model/Project";
import LightSelection from "../model/LightSelection";
import CatalogItem from "../model/CatalogItem";
import Room from "../model/Room";
import RFP from "../model/RFP";
import logging from "../../config/logging";

const createNewUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Please fill in all required fields" });
  }

  await User.findOne({ email })
    .then(async (existingUser) => {
      if (existingUser) {
        res
          .status(400)
          .json({ message: "An account with this email already exists." });
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
                role: result.role,
              },
            });
          })
          .catch((error) => {
            logging.error(error.message, "createNewUser");
            res.status(500).json({ message: error.message });
          });
      }
    })
    .catch((error) => {
      logging.error(error.message, "createNewUser");
      res.sendStatus(500).json({ message: error.message });
    });
};

const getAllUsers = (req: Request, res: Response) => {
  User.find()
    .exec()
    .then((results) => {
      logging.info(`Users: ${results}`, "getAllUsers");

      return res.status(200).json({
        users: results,
        count: results.length,
      });
    });
};

const resetDatabase = async (req: Request, res: Response) => {
  try {
    let deletedProjectCount = 0;
    let deletedLightSelectionCount = 0;
    let deletedCatalogItemCount = 0;
    let deletedRoomCount = 0;
    let deletedRFPCount = 0;

    await Project.deleteMany({})
      .exec().then((result) => {
        deletedProjectCount = result.deletedCount;
      });

    await LightSelection.deleteMany({})
      .exec().then((result) => {
        deletedLightSelectionCount = result.deletedCount;
      });

    await CatalogItem.deleteMany({})
      .exec().then((result) => {
        deletedCatalogItemCount = result.deletedCount;
      });

    await Room.deleteMany({})
      .exec().then((result) => {
        deletedRoomCount = result.deletedCount;
      });

    await RFP.deleteMany({})
      .exec().then((result) => {
        deletedRFPCount = result.deletedCount;
      });

    return res.status(200).json({
      deletedProjectCount,
      deletedLightSelectionCount,
      deletedCatalogItemCount,
      deletedRoomCount,
      deletedRFPCount,
    });
  } catch (error: any) {
    logging.error(error.message, "resetDatabase");
    return res.status(500).json({ message: error.message });
  }
};

export default { createNewUser, getAllUsers, resetDatabase };
