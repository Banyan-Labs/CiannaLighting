import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Project from "../model/Project";
import Room from "../model/Room";
import LightSelection from "../model/LIghtSelection";
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
    .then(async(project) => {
      if (project) {
        project.rooms = [...project.rooms, room._id];        
        project.activity = {
          ...project.activity, rooms: [...project.activity.rooms, [`Room ${name} added, ID: ${room._id}.`, `${[curDate[1], curDate[2], curDate[0]].join(
            "/"
          )}`]]
        }        
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
  return roomAndProject;
};

const getAllRooms = (req: Request, res: Response) => {
  const { projectId } = req.body;
  console.log(projectId);
  if (projectId && projectId.length) {
    Room.find({ projectId })
      .then((rooms) => {
        return res.status(200).json({
          rooms,
        });
      })
      .catch((error) => {
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
        return res.status(500).json({ message: error.message, error });
      });
  }
};

const getRoom = async (req: Request, res: Response) => {
  const keys = Object.keys(req.body).filter((key: string) => key != "_id");
  const parameters = Object.fromEntries(
    keys.map((key: string) => [key, req.body[key.toString()]])
  );
  return await Room.findOne({ _id: req.body._id })
    .exec()
    .then((room: any) => {
      if (room && keys.length) {
        keys.map((keyName: string) => {
          room[keyName] = parameters[keyName];
        });
        room.save();
      }
      console.log(`room: ${room?.name} retrieved`);
      return res.status(200).json({
        room,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const deleteRoom = async (req: Request, res: Response) => {
  return await Project.findByIdAndUpdate({ _id: req.body.projectId })
    .exec()
    .then(async (project) => {
      if (project) {
        project.activity = {
          ...project.activity, rooms: [...project.activity.rooms, [`Project Deleted, ID: ${req.body._id}.`, `${[curDate[1], curDate[2], curDate[0]].join(
            "/"
          )}`]]
        }
        project.rooms = project.rooms.filter((id: string) => {
          return String(id) !== req.body._id ? id : "";
        });
        console.log("Project updated DELETEROOM: ", project)
        await project.save();
      }
      const roomRemoved = "room removed successfully from project";
      await LightSelection.deleteMany({ roomId: req.body._id })
        .exec()
        .then((res) => {
          return res.deletedCount;
        })
        .catch((err) => {
          return err.message;
        });
      return await Room.findByIdAndDelete({ _id: req.body._id })
        .then((room) => {
          return !room
            ? res.status(200).json({
                room,
              })
            : res.status(404).json({
                message: "The Room you are looking for no longer exists",
                roomRemoved,
              });
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });
};

export default { createRoom, deleteRoom, getAllRooms, getRoom };
