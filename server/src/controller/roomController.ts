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
  const project = await Project.findById({ _id: projectId })
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

  return project;
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
        keys.map((keyName: string) => {
          room[keyName] = parameters[keyName];
        });

        await room.save();

        const lightSelections = await LightSelection.find({ roomId: room._id, projectId: req.body.projectId });

        if (lightSelections) {
          lightSelections.map(async (lightSelection: any) => {
            lightSelection.roomId = room._id
            lightSelection.roomName = room.name;

            await lightSelection.save();
          })
        }

        const project = await Project.findOne({ _id: req.body.projectId });

        if (project) {
          project.lightIDs = await updateLightIds(project);

          await project.save();
        }
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

const updateLightIds = async (project: any) => {
  const updatedLightIds: any = {};

  for (let i = 0; i < project.rooms.length; i++) {
    const roomId = project.rooms[i];

    await Room.findOne({ _id: roomId })
      .exec()
      .then(async (room: any) => {
        for (let j = 0; j < room?.lights?.length; j++) {
          const lightId = room?.lights[j];

          await LightSelection.findOne({ _id: lightId })
            .exec()
            .then((light: any) => {
              if (light) {
                if (updatedLightIds[light.item_ID]) {
                  updatedLightIds[light.item_ID].rooms.push(room.name);
                } else {
                  const lightID: LightREF = {
                    item_ID: light.item_ID,
                    rooms: [room.name]
                  };

                  updatedLightIds[light.item_ID] = lightID;
                }
              }
            });
        }
      });
  };

  if (Object.keys(updatedLightIds).length) {
    return Object.values(updatedLightIds) as LightREF[];
  } else {
    return [] as LightREF[];
  }
}

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
            logging.info(`Room deleted: ${room}`, "deleteRoom");
          })
          .catch((error) => {
            logging.error(error.message, "deleteRoom");
            return res.status(500).json(error);
          });

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

        project.lightIDs = await updateLightIds(project);

        await project.save();

        return res.status(200).json(project);
      } else {
        res.status(204).json({ message: `No project found using _id of #${projectId}.` });
      }
    }).catch((error) => {
      logging.error(error.message, "deleteRoom");
      return res.status(500).json(error);
    });
};

export default { createRoom, deleteRoom, getAllRooms, getRoom, updateLightIds };
