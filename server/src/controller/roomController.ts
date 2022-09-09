import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { nextTick } from "process";
import Project from "../model/Project";
import Room from "../model/Room";

const createRoom = async(req: Request, res: Response, next: NextFunction) => {
    let { name, description, clientId, projectId } = req.body;
    const room = new Room({
      _id: new mongoose.Types.ObjectId(),
      name,
      clientId,
      projectId,
      description,
      lights: [],
  });
  console.log(projectId)
  let roomAndProject = await Project.findByIdAndUpdate({_id: projectId})
  .exec()
  .then((project)=>{
    console.log(project, "PROJECT")
    if(project){
        project.rooms = [...project.rooms, room._id]
        project.save()
        let projectSuccess = `added room to project: ${projectId}`
        return room
        .save()
        .then((room) => {
          return res.status(201).json({
            room,
            message: projectSuccess
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: error.message,
            error,
          });
        })
    }
    else{
        next()
    }
  })
  .catch((error) => {
    console.log(projectId, error.message, "fail")
    return res.status(500).json({
      message: error.message,
      error,
    });
  })
return roomAndProject

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