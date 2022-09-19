import { Request, Response } from "express";
import { request } from "http";
import mongoose from "mongoose";
import LightSelection from "../model/LightSelection";
import Project from "../model/Project";
import Room from "../model/Room";

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
    // rfp: {},
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
const getProject = async(req: Request, res: Response)=>{
  return await Project.findOne({_id: req.body._id})
      .exec()
      .then((project)=>{
        console.log(`project:${project?.name} `)
        return res.status(200).json({
          project
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error });
      });
}
const getAccountProjects = async (req:Request, res: Response) => {
  return await Project.find({clientId: req.body.clientId})
      .exec()
      .then((projects)=>{
        console.log('projects success', projects)
        return res.status(200).json({
          projects
        })
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error });
      });
}

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

const deleteProject = async (req: Request, res: Response) => {
  // when rfpDocs are created, still need to include.
  return await Project.findByIdAndDelete({_id: req.body._id})
    .then(async(project) => {
      console.log(project, "project in projDelete")
      if(project && project.rooms.length){
        await Room.deleteMany({projectId: req.body._id})
        .exec()
        .then((res)=>{
          console.log(res, "rooms all deleted")
          return res.deletedCount 
          
        })
        .catch((err)=>{
          console.log(err)
          return err.message
        })
        await LightSelection.deleteMany({projectId: req.body._id})
        .exec()
        .then((res)=>{
          console.log(res, "lights all deleted")
          return res.deletedCount  
        })
        .catch((err)=>{
          console.log(err)
          return err.message
        })


      }

      return !project
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

export default { createProject, deleteProject, getAllProjects, getProject, getAccountProjects };
