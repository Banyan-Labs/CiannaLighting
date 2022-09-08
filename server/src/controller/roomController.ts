import { Request, Response } from "express";
import mongoose from "mongoose";
import Room from "../model/Room";

const createRoom = (req: Request, res: Response) => {
    let { name, description, clientId, projectId } = req.body;

    const room = new Room({
      _id: new mongoose.Types.ObjectId(),
      name,
      clientId,
      projectId,
      description,
      lights: [],
  });

  return room
    .save()
    .then((room) => {
      return res.status(201).json({
        room,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getAllRooms = (req: Request, res: Response) => {
  Room.find()
    .then((rooms) => {
      return res.status(200).json({
        rooms,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const deleteRoom = (req: Request, res: Response) => {
  Room.findByIdAndDelete(req.params.id)
    .then((room) => {
      !room
        ? res.status(200).json(room)
        : res.status(404).json({
            message: "The Project you are looking for no longer exists",
          });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export default { createRoom, deleteRoom, getAllRooms };