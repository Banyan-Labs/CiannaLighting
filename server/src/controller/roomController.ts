import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import Project from "../model/Project";
import Room from "../model/Room";
import LightSelection from "../model/LightSelection";
import { LightREF } from "../interfaces/projectInterface";
import logging from "../../config/logging";

const curDate = new Date().toISOString().split("T")[0].split("-");

const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, clientId, projectId } = req.body;
  const room = new Room({
    _id: new mongoose.Types.ObjectId(),
    name,
    clientId,
    projectId,
    description,
    lights: [],
  });
  const roomAndProject = await Project.findByIdAndUpdate({ _id: projectId })
    .exec()
    .then(async (project) => {
      if (project) {
        project.rooms = [...project.rooms, room._id];
        project.activity = {
          ...project.activity,
          rooms: [
            ...project.activity.rooms,
            [
              `Room ${name} added, ID: ${room._id}.`,
              `${[curDate[1], curDate[2], curDate[0]].join("/")}`,
            ],
          ],
        };
        await project.save();
        const projectSuccess = `added room to project: ${projectId}`;
        return room
          .save()
          .then((room) => {
            return res.status(201).json({
              room,
              message: projectSuccess,
            });
          })
          .catch((error) => {
            logging.error(error.message, "createRoom");
            return res.status(500).json({
              message: error.message,
              error,
            });
          });
      } else {
        res.status(204).json({ message: `No project found using _id of #${projectId}.` });
      }
    })
    .catch((error) => {
      logging.error(error.message, "createRoom");
      return res.status(500).json({
        message: error.message,
        error,
      });
    });

  return roomAndProject;
};

const getAllRooms = (req: Request, res: Response) => {
  const { projectId } = req.body;

  if (projectId) {
    Room.find({ projectId })
      .then((rooms) => {
        return res.status(200).json({
          rooms,
        });
      })
      .catch((error) => {
        logging.error(error.message, "getAllRooms");
        return res.status(500).json({ message: error.message, error });
      });
  } else {
    Room.find()
      .then((rooms) => {
        return res.status(200).json({
          rooms,
        });
      })
      .catch((error) => {
        logging.error(error.message, "getAllRooms");
        return res.status(500).json({ message: error.message, error });
      });
  }
};

const getRoom = async (req: Request, res: Response) => {
  const keys = Object.keys(req.body).filter((key: string) => key != '_id' && key != 'projectId' && key != 'roomName');
  const parameters = Object.fromEntries(
    keys.map((key: string) => [key, req.body[key.toString()]])
  );

  return await Room.findOne({ _id: req.body._id })
    .exec()
    .then(async (room: any) => {
      if (room && keys.length) {
        if (room.name !== req.body.name) {
          const project = await Project.findOne({ _id: req.body.projectId });
          if (project) {
            const newLightIds = project.lightIDs.map((light: LightREF) => {
              const newRooms = light.rooms.map((lightIdRoom: string) => lightIdRoom === room.name ? req.body.name : lightIdRoom);
              return { item_ID: light.item_ID, rooms: newRooms };
            })
            project.lightIDs = newLightIds;
            await project.save();
          }
        }
        keys.map((keyName: string) => {
          room[keyName] = parameters[keyName];
        });
        room.save();
      } else if (!room) {
        return res.status(204).json({ message: `No room found using _id of #${req.body._id}.` });
      }

      return res.status(200).json({
        room,
      });
    })
    .catch((error) => {
      logging.error(error.message, "getRoom");
      return res.status(500).json({ message: error.message, error });
    });
};

const deleteRoom = async (req: Request, res: Response) => {
  type RequestBody = {
    projectId: string;
    _id: string;
    itemIDS: string[];
  }
  const { projectId, _id, itemIDS }: RequestBody = req.body;

  return await Project.findById({ _id: projectId })
    .exec()
    .then(async (project) => {
      if (project) {
        project.activity = {
          ...project.activity,
          rooms: [
            ...project.activity.rooms,
            [
              `Room Deleted, ID: ${_id}.`,
              `${[curDate[1], curDate[2], curDate[0]].join("/")}`,
            ],
          ],
        };

        project.rooms = project.rooms.filter((id: string) => {
          return String(id) !== _id;
        });

        await project.save();

        await LightSelection.deleteMany({ roomId: _id })
          .exec()
          .then((lightSelection) => {
            logging.info(`LightSelections deleted: ${lightSelection.deletedCount}`, "deleteRoom");
            logging.info(lightSelection, "deleteRoom");
          })
          .catch((error) => {
            logging.error(error.message, "deleteRoom");
            res.status(500).json(error);
          });
  
        await Room.findByIdAndDelete({ _id })
          .then((room) => {
            return res.status(200).json(room);
          })
          .catch((error) => {
            logging.error(error.message, "deleteRoom");
            return res.status(500).json(error);
          });
      } else {
        res.status(204).json({ message: `No project found using _id of #${projectId}.` });
      }
    }).catch((error) => {
      logging.error(error.message, "deleteRoom");
      return res.status(500).json(error);
    });
};

export default { createRoom, deleteRoom, getAllRooms, getRoom };
