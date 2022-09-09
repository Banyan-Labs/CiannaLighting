import { Request, Response } from "express";
import mongoose from "mongoose";
import Project from "../model/Project";

const createProject = (req: Request, res: Response) => {
  let { name, description, clientId, clientName, region, status } = req.body;

  const project = new Project({
    _id: new mongoose.Types.ObjectId(),
    name,
    clientId,
    clientName,
    region,
    status,
    description,
    rfp: {},
    rooms: [],
  }
  );
  return project
    .save()
    .then((project) => {
      return res.status(201).json({
        project,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getAllProjects = (req: Request, res: Response) => {
  Project.find()
    .then((projects) => {
      return res.status(200).json({
        projects,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const deleteProject = (req: Request, res: Response) => {
  Project.findByIdAndDelete(req.params.id)
    .then((project) => {
      !project
        ? res.status(200).json(project)
        : res.status(404).json({
            message: "The Project you are looking for no longer exists",
          });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export default { createProject, deleteProject, getAllProjects };
