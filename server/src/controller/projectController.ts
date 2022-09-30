import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import projectInterface from "../interfaces/projectInterface";
import roomInterface from "../interfaces/roomInterface";
import LightSelection from "../model/LightSelection";
import Project from "../model/Project";
import Room from "../model/Room";

const createProject = async (req: Request, res: Response) => {
  let { _id, name, description, clientId, clientName, region, status, create } =
    req.body;

  const project = new Project({
    _id: new mongoose.Types.ObjectId(),
    name,
    clientId,
    clientName,
    region,
    status,
    description,
    rfp: "",
    rooms: [],
  });
  if (create == ("room" || "project")) {
  }
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
const getProject = async (req: Request, res: Response) => {
  let keys = Object.keys(req.body).filter((key: string) => key != "_id");
  let parameters = Object.fromEntries(
    keys.map((key: String) => [key, req.body[key.toString()]])
  );

  return await Project.findOne({ _id: req.body._id })
    .exec()
    .then((project) => {
      console.log(`project: ${project?.name} retrieved`);
      if (project && keys.length) {
        keys.map((keyName: string) => {
          switch (keyName) {
            case "name":
              project.name = parameters["name"];
              break;
            case "region":
              project.region = parameters["region"];
              break;
            case "status":
              project.status = parameters["status"];
              break;
            case "description":
              project.description = parameters["description"];
              break;
            default:
              null;
          }
        });
      }
      return res.status(200).json({
        project,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};
const getAccountProjects = async (req: Request, res: Response) => {
  return await Project.find({ clientId: req.body.clientId })
    .exec()
    .then((projects) => {
      return res.status(200).json({
        projects,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const getAllProjects = async (req: Request, res: Response) => {
  let check = Object.keys(req.body).filter(
    (x) => x != "authEmail" && x != "authRole"
  );
  let security = check.filter(
    (x) => x === "status" || x === "region" || x === "clientId"
  );

  if (security.length && check.length === security.length) {
    await Project.find({ ...req.body })
      .then((projects) => {
        return res.status(200).json({
          projects,
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error });
      });
  } else {
    await Project.find()
      .then((projects) => {
        return res.status(200).json({
          projects,
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error });
      });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  // when rfpDocs are created, still need to include.
  return await Project.findByIdAndDelete({ _id: req.body._id })
    .then(async (project) => {
      if (project && project.rooms.length) {
        await Room.deleteMany({ projectId: req.body._id })
          .exec()
          .then((res) => {
            console.log(res, "rooms all deleted");
            return res.deletedCount;
          })
          .catch((err) => {
            console.log(err);
            return err.message;
          });
        await LightSelection.deleteMany({ projectId: req.body._id })
          .exec()
          .then((res) => {
            console.log(res, "lights all deleted");
            return res.deletedCount;
          })
          .catch((err) => {
            console.log(err);
            return err.message;
          });
      }

      return !project
        ? res.status(200).json(project)
        : res.status(404).json({
            message: "The Project you are looking for no longer exists",
          });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const reCreate = (project: string, rooms: string[], create: string) => {
  rooms.forEach(async (roomID: string) => {
    console.log("room in rooms: ", roomID);
    await Room.findOne({ _id: roomID })
      .exec()
      .then((room: any) => {
        let lights: string[] | [];
        if (room.lights.length) {
          lights = handleLights(room.lights, roomID);
        } else {
          lights = [];
        }
        const newRoom = new Room({
          ...room,
          lights: lights,
          _id: new mongoose.Types.ObjectId(),
          projectId: project,
        });
        /**heeeeeeeeeeeeere */
      });
  });
};

const handleLights = (lights: string[], roomID: string): string[] => {
  let newLights = lights.map((lightID: string) => {
    console.log("light in lights: ", lightID);
    let reRun: string = "";
    const checkLight = async (trying: string) => {
      await LightSelection.findOne({ _id: trying })
        .exec()
        .then((lightSelection: any) => {
          const light = new LightSelection({
            ...lightSelection,
            _id: new mongoose.Types.ObjectId(),
            roomId: roomID,
          });
          light.save();
          lightID = light._id;
        })
        .catch((error) => {
          reRun = lightID;
        });
    };
    checkLight(lightID);
    while (reRun.length) {
      checkLight(reRun);
    }

    return lightID;
  });
  return newLights;
};

export default {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  getAccountProjects,
};
