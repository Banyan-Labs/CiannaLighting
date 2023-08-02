import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import LightSelection from "../model/LightSelection";
import { lightIdService } from "./lightSelectionController";
import Project from "../model/Project";
import Room from "../model/Room";
import { ActionType, CopyType } from "../utils/constants";
import logging from "../../config/logging";
import CatalogItem from "../model/CatalogItem";

const createProject = async (req: Request, res: Response) => {
  const {
    _id,
    name,
    description,
    clientId,
    clientName,
    region,
    status,
    lightIDs,
    rooms,
    copy,
  } = req.body;
  let curDate = new Date().toISOString().split("T")[0].split("-");
  /**
   * If you are copying an instance of someone elses project or room, you have to pass in the userId, not the project clientId
   */
  /**
   *
   *
   *  need to include in copying a room instead of just the light
   *
   *
   *
   */

  if (_id && copy === CopyType.ROOM) {
    Room.findOne({ _id: rooms[0] })
      .then(async (foundRoom) => {
        await runRoom(foundRoom, _id, clientId, copy);
        return res.status(201).json({
          message: rooms[0],
        });
      })
      .catch((error) => {
        logging.error(error.message, "createProject");
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
  } else {
    const project = new Project({
      _id: new mongoose.Types.ObjectId(),
      archived: false,
      name: copy === CopyType.PROJECT ? `Copy of ${name}` : name,
      clientId: clientId,
      clientName: clientName,
      region: region,
      status: status,
      description: description,
      rooms: [],
      lightIDs: copy === CopyType.PROJECT ? lightIDs : [],
      activity: {
        createUpdate: `Created on ${[curDate[1], curDate[2], curDate[0]].join(
          "/"
        )}`,
        rooms: [],
        archiveRestore: [],
        status: [
          [
            `Status: ${status}`,
            `${[curDate[1], curDate[2], curDate[0]].join("/")}`,
          ],
        ],
      },
    });

    return await project
      .save()
      .then(async (project) => {
        if (project) {
          if (_id && copy === CopyType.PROJECT) {
            if (project) {
              let i = 0;

              while (i < rooms.length) {
                await Room.findOne({ _id: rooms[i] })
                  .then(async (foundRoom) => {
                    await runRoom(foundRoom, project._id, clientId, copy);
                    i++
                  }).catch((error) => {
                    logging.error(error.message, "createProject");
                    res.status(500).json({
                      error,
                    });
                  });
              }

              if (i === rooms.length) {
                return res.status(201).json({
                  project,
                  message: `copy of project ${_id}`,
                });
              }
            }
          } else {
            return res.status(201).json({
              project,
            });
          }
        }
      })
      .catch((error) => {
        logging.error(error.message, "createProject");
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
  }
};

const getProject = async (req: Request, res: Response, next: NextFunction) => {
  const keys = Object.keys(req.body).filter(
    (key: string) => key != "_id" && key != "authEmail" && key != "authRole"
  );
  const parameters = Object.fromEntries(
    keys.map((key: string) => [key, req.body[key.toString()]])
  );
  const curDate = new Date().toISOString().split("T")[0].split("-");

  return await Project.findOne({ _id: req.body._id })
    .exec()
    .then(async (project) => {
      if (project) {
        if (project && project.activity == undefined) {
          project["activity"] = {
            createUpdate: `Created on ${[curDate[1], curDate[2], curDate[0],].join("/")}`,
            rooms: [],
            archiveRestore: [],
            status: [
              [
                `Status: ${project.status}`,
                `${[curDate[1], curDate[2], curDate[0]].join("/")}`,
              ],
            ],
          };
        }

        if (keys.length) {
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
                project.activity = {
                  ...project.activity,
                  status: [
                    [
                      `Status: ${parameters["status"]}`,
                      `${[curDate[1], curDate[2], curDate[0]].join("/")}`,
                    ],
                    ...project.activity.status,
                  ],
                };
                break;
              case "description":
                project.description = parameters["description"];
                break;
              case "activityClear":
                project.activity.rooms = parameters["activityClear"];
                project.activity.archiveRestore = parameters["activityClear"];
                break;
              case "activity":
                project.activity = {
                  ...project.activity,
                  archiveRestore: project.activity.archiveRestore
                    ? [
                      [
                        `Project ${parameters["activity"]}ed`,
                        `${[curDate[1], curDate[2], curDate[0]].join("/")}`,
                      ],
                      ...project.activity.archiveRestore,
                    ]
                    : [
                      [
                        `Project ${parameters["activity"]}ed`,
                        `${[curDate[1], curDate[2], curDate[0]].join("/")}`,
                      ],
                    ],
                };
                break;
              default:
                break;
            }
          });
          if (project.activity) {
            project.activity = {
              ...project.activity,
              createUpdate: `Updated on ${[curDate[1], curDate[2], curDate[0],].join("/")}`,
            };
          }
        }
        project.save();

        return res.status(200).json({
          project,
        });
      } else {
        return res.status(204).json({ message: `No project found using _id #${req.body._id}.` });
      }
    })
    .catch((error) => {
      logging.error(error.message, "getProject");
      return res.status(500).json({ message: error.message, error });
    });
};

const runRoom = async (room: any, newProjectId: string, clientId: string, copy: CopyType): Promise<void> => {
  const { name, description, lights } = room;
  /**
   * Need to include lideSelectionService in here and update the information
   * from the front end to send the itemIDS from the front end of each light in the room being copied.
   *
   */
  const newRoom = new Room({
    _id: new mongoose.Types.ObjectId(),
    name: copy === CopyType.ROOM ? `Copy of ${name}` : name,
    clientId: clientId,
    projectId: newProjectId,
    description: description,
    lights: [],
  });
  const project = await Project.findOne({ _id: newProjectId });
  let curDate = new Date().toISOString().split("T")[0].split("-");

  if (project) {
    project.activity = {
      ...project.activity,
      rooms: [
        [
          `${room.name.toUpperCase()} copied and created new roomID: ${newRoom._id}.`,
          `${[curDate[1], curDate[2], curDate[0]].join("/")}`,
        ],
        ...project.activity.rooms,
      ],
      createUpdate: `Updated on ${[curDate[1], curDate[2], curDate[0]].join("/")}`,
    };
    project.rooms = [...project.rooms, newRoom._id];

    await project.save();
  }

  await newRoom.save().then(async (room) => {
    if (room) {
      for (let i = 0; i < lights.length; i++) {
        logging.info(`Copying light ${lights[i]._id} in room ${room._id} of project ${newProjectId}`, "runRoom");
        await LightSelection.findOne({ _id: lights[i] }).then(async (light) => {
          await runLights(light, room, newProjectId, clientId, copy);
        });
      }
    }
  });
};


const runLights = async (
  light: any,
  newRoom: any,
  newProjectId: string,
  clientId: string,
  copy: CopyType
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
    roomName: newRoom?.name,
    roomId: newRoom?._id,
    projectId: newProjectId,
    clientId: clientId,
    quantity: light.quantity,
    price: light.price,
    description: light.description,
    lampType: light.lampType,
    lampColor: light.lampColor,
    wattsPer: light.wattsPer,
    totalWatts: light.totalWatts,
    numberOfLamps: light.numberOfLamps,
    totalLumens: light.totalLumens,
  });
  const room = await Room.findOne({ _id: newRoom._id });

  if (room) {
    room.lights = [...room.lights, newLight._id];

    return await room
      .save()
      .then(async () => {
        const savedLight = await newLight.save();

        if (savedLight) {
          const {
            item_ID,
            roomName,
            projectId,
          } = savedLight;

          if (copy === CopyType.ROOM) {
            await lightIdService(projectId, ActionType.ADD, item_ID, roomName);
          }
        }
      }).catch((error) => {
        logging.error(error.message, "runLights");
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
      logging.error(error.message, "getAccountProjects");
      return res.status(500).json({ message: error.message, error });
    });
};

const getAllProjects = async (req: Request, res: Response) => {
  const check = Object.keys(req.body).filter(
    (x) => x != "authEmail" && x != "authRole" && x != "clientId" && x != "type"
  );
  const security = check.filter(
    (x) => x === "status" || x === "region" || x === "clientName"
  );
  const workingUpdate = Object.fromEntries(
    security.map((x) => [x, req.body[x]])
  );

  if (security.length && check.length === security.length) {
    await Project.find({ ...workingUpdate })
      .then(async (projects) => {
        const { type, clientId } = req.body;
        const indProj = projects.filter((x) => x.clientId === clientId);
        // if filtering through only user project
        const filterProj = (await type) === "allProjects" ? projects : indProj;

        return res.status(200).json({
          filterProj,
        });
      })
      .catch((error) => {
        logging.error(error.message, "getAllProjects");
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
        logging.error(error.message, "getAllProjects");
        return res.status(500).json({ message: error.message, error });
      });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  return await Project.findByIdAndDelete({ _id: req.body._id })
    .then(async (project) => {
      if (project && project.rooms.length) {
        await Room.deleteMany({ projectId: req.body._id })
          .exec()
          .then((res) => {
            return res.deletedCount;
          })
          .catch((err) => {
            return err.message;
          });
        await LightSelection.deleteMany({ projectId: req.body._id })
          .exec()
          .then((res) => {
            return res.deletedCount;
          })
          .catch((err) => {
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
      logging.error(error.message, "deleteProject");
      res.status(500).json(error);
    });
};

const getAttachments = async (req: Request, res: Response) => {
  const { projectId } = req.body;

  if (!projectId) {
    return res.status(400).json({
      message: "No Project ID was provided",
    });
  }

  await Project.findOne({ _id: projectId })
    .then(async (project) => {
      if (project) {
        const lightSelectionIDs = project.lightIDs?.map((x) => x.item_ID);

        if (!lightSelectionIDs?.length) {
          return res.status(200).json({
            files: [],
          });
        }

        const catalogItems = await CatalogItem.find({
          item_ID: { $in: lightSelectionIDs },
        });
        const files: string[] = [];

        catalogItems.forEach((item) => {
          if (item.renderings?.length) {
            item.renderings.forEach((x) => {
              files.push(x);
            });
          }
          if (item.cutSheets?.length) {
            item.cutSheets.forEach((x) => {
              files.push(x);
            });
          }
        });

        return res.status(200).json({
          files: [...new Set(files?.sort((a, b) => a.localeCompare(b)))],
        });
      } else {
        return res.status(404).json({
          message: "The Project you are looking for no longer exists",
        });
      }
    })
    .catch((error) => {
      logging.error(error.message, "getAttachments");
      return res.status(500).json({ message: error.message, error });
    });
};

export default {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  getAccountProjects,
  getAttachments,
};
