import { Request, Response } from "express";
import mongoose from "mongoose";
import LightSelection from "../model/LIghtSelection";
import Project from "../model/Project";
import Room from "../model/Room";

const createProject = async (req: Request, res: Response) => {
  const {
    _id,
    name,
    description,
    clientId,
    clientName,
    region,
    status,
    rooms,
    copy } = req.body;
  /**
   * If you are copying an instance of someone elses project or room, you have to pass in the userId, not the project clientId
   */

  if (_id && copy === "room") {
    Room.findOne({ _id: rooms[0] })
      .then(async (foundRoom) => {
        await runRoom(foundRoom, _id, clientId);
        return res.status(201).json({
          message: `copy of room ${rooms[0]}`,
        });
      })
      .catch((error) => {
        console.log("Error in finding room: ", error.message);
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
  } else {
    const project = new Project({
      _id: new mongoose.Types.ObjectId(),
      archived: false,
      name: name,
      clientId: clientId,
      clientName: clientName,
      region: region,
      status: status,
      description: description,
      rfp: "",
      rooms: [],
    });

    return await project
      .save()
      .then(async (project) => {
        if (_id && copy === "project") {
          if (project) {
            for (let i = 0; i < rooms.length; i++) {
              await Room.findOne({ _id: rooms[i] })
                .then(async (foundRoom) => {
                  await runRoom(foundRoom, project._id, clientId);
                })
                .catch((error) => {
                  console.log(error, "error rinding room line 65");
                });
            }
          }
          return res.status(201).json({
            project,
            message: `copy of project ${_id}`,
          });
        } else {
          return res.status(201).json({
            project,
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
  }
};

const getProject = async (req: Request, res: Response) => {
  const keys = Object.keys(req.body).filter((key: string) => key != "_id");
  const parameters = Object.fromEntries(
    keys.map((key: string) => [key, req.body[key.toString()]])
  );

  return await Project.findOne({ _id: req.body._id })
    .exec()
    .then((project) => {
      console.log(project, "PROJECT");
      console.log(`project: ${project?.name} retrieved`);
      if (project && keys.length) {
        keys.map((keyName: string) => {
          switch (keyName) {
            case "name":
              project.name = parameters["name"];
              break;
            case "archived":
              project.archived = parameters["archived"];
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
        project.save();
      }
      return res.status(200).json({
        project,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};
const runRoom = async (room: any, newProjectId: string, clientId: string) => {
  const { name, description, lights } = room;

  const newRoom = new Room({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    clientId: clientId,
    projectId: newProjectId,
    description: description,
    lights: [],
  });
  const roomAndProject = await Project.findOne({ _id: newProjectId });

  if (roomAndProject) {
    roomAndProject.rooms = [...roomAndProject.rooms, newRoom._id];
    roomAndProject.save();
  }

  await newRoom.save().then(async (room) => {
    if (room) {
      for (let i = 0; i < lights.length; i++) {
        await LightSelection.findOne({ _id: lights[i] }).then(async (light) => {
          await runLights(light, room._id, room.projectId, clientId);
        });
      }
    }
  });

  return roomAndProject;
};

const runLights = async (
  light: any,
  newRoomId: string,
  newProjectId: string,
  clientId: string
) => {
  const newLight = new LightSelection({
    _id: new mongoose.Types.ObjectId(),
    item_ID: light.item_ID,
    exteriorFinish: light.exteriorFinish,
    interiorFinish: light.interiorFinish,
    lensMaterial: light.lensMaterial,
    glassOptions: light.glassOptions,
    acrylicOptions: light.acrylicOptions,
    environment: light.environment,
    safetyCert: light.safetyCert,
    projectVoltage: light.projectVoltage,
    socketType: light.socketType,
    mounting: light.mounting,
    crystalType: light.crystalType,
    crystalPinType: light.crystalPinType,
    crystalPinColor: light.crystalPinColor,
    roomName: light.roomName,
    roomId: newRoomId,
    projectId: newProjectId,
    clientId: clientId,
    quantity: light.quantity,
  });

  const lightAndRoom = await Room.findOne({ _id: newRoomId });

  if (lightAndRoom) {
    lightAndRoom.lights = [...lightAndRoom.lights, newLight._id];

    return await lightAndRoom
      .save()
      .then((room) => {
        newLight.save();
        console.log("Room save success: ", room);
      })
      .catch((error) => {
        console.log(
          "Error after saving new light ID to new room: ",
          error.message
        );
      });
  }
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
  const check = Object.keys(req.body).filter(
    (x) => x != "authEmail" && x != "authRole"
  );
  const security = check.filter(
    (x) => x === "status" || x === "region" || x === "clientName"
  );
  const workingUpdate = Object.fromEntries(security.map((x) => [x, req.body[x]]));
  console.log("payload proj filter: ",{...workingUpdate})

  if (security.length && check.length === security.length) {
    await Project.find({ ...workingUpdate })
      .then((projects) => {
        console.log(projects)
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
  console.log("project delete body: ", req.body);
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

export default {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  getAccountProjects,
};
