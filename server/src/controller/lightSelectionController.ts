import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import LightSelection from "../model/LightSelection";
import Room from "../model/Room";

const lightSelected = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let {
    item_ID,
    exteriorFinish,
    interiorFinish,
    lensMaterial,
    glassOptions,
    acrylicOptions,
    environment,
    safetyCert,
    projectVoltage,
    socketType,
    mounting,
    crystalType,
    crystalPinType,
    crystalPinColor,
    roomName,
    roomId,
    projectId,
    clientId,
    quantity,
  } = req.body;

  const light = new LightSelection({
    _id: new mongoose.Types.ObjectId(),
    item_ID,
    exteriorFinish,
    interiorFinish,
    lensMaterial,
    glassOptions,
    acrylicOptions,
    environment,
    safetyCert,
    projectVoltage,
    socketType,
    mounting,
    crystalType,
    crystalPinType,
    crystalPinColor,
    roomName,
    roomId,
    projectId,
    clientId,
    quantity,
  });
  let lightAndRoom = await Room.findByIdAndUpdate({ _id: roomId })
    .exec()
    .then((room) => {
      if (room) {
        room.lights = [...room.lights, light._id];
        room.save();
        let roomSuccess = `added light to room: ${roomId}`;
        return light
          .save()
          .then((light) => {
            return res.status(201).json({
              light,
              message: roomSuccess,
            });
          })
          .catch((error) => {
            return res.status(500).json({
              message: error.message,
              error,
            });
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
  return lightAndRoom;
};

const getAllSelectedLights = (req: Request, res: Response) => {
  LightSelection.find()
    .then((lights) => {
      return res.status(200).json({
        lights,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};
const getSelectedLight = async (req: Request, res: Response) => {
  return await LightSelection.findOne({ _id: req.body._id })
    .exec()
    .then((light) => {
      console.log(`light_selected:${light?.item_ID} `);
      return res.status(200).json({
        light,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const deleteSelectedLight = async (req: Request, res: Response) => {
  return await Room.findByIdAndUpdate({ _id: req.body.roomId })
    .exec()
    .then(async (room) => {
      if (room) {
        room.lights = room.lights.filter((id: string) => {
          return String(id) !== req.body._id ? id : "";
        });
        room.save();

        let lightRemoved = "light removed successfully from room";
        return await LightSelection.findByIdAndDelete({ _id: req.body._id })
          .then((lightSelection) => {
            return !lightSelection
              ? res.status(200).json({
                  lightSelection,
                })
              : res.status(404).json({
                  message:
                    "The light selection you are looking for no longer exists",
                  lightRemoved,
                });
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      } else {
        return "failed to delete light from room";
      }
    });
};

export default {
  lightSelected,
  getAllSelectedLights,
  deleteSelectedLight,
  getSelectedLight,
};