import { json } from "body-parser";
import { Request, Response, NextFunction } from "express";
import { request } from "http";
import { Settings } from "http2";
import mongoose from "mongoose";
import projectInterface from "../interfaces/projectInterface";
import roomInterface from "../interfaces/roomInterface";
import LightSelection from "../model/LightSelection";
import Project from "../model/Project";
import Room from "../model/Room";
import createRoom from "./roomController";

const createProject = (req: Request, res: Response) => {
  let {
    _id,
    name,
    description,
    clientId,
    clientName,
    region,
    status,
    rooms,
    create,
  } = req.body;
  /**
   * If you are copying an instance of someone elses project or room, you have to pass in the userId, not the project clientId
   */
  let newRooms: string[] = [];

  if (_id && create === "single") {
    // reCreate(_id, [rooms[1]], clientId, 0);
    // createRoom({...Request, bo })

    console.log(rooms, "roooooms ?");
    return res.json({
      message: "ran single room copy",
    });
  }
  const project = new Project({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    clientId: clientId,
    clientName: clientName,
    region: region,
    status: status,
    description: description,
    rfp: "",
    rooms: [],
  });

  return project
    .save()
    .then((project) => {
      if (_id && create === "project") {
        if(project){
        for (let i = 0; i < rooms.length; i++) {
           Room.findOne({ _id: rooms[i]})
            
            .then((foundRoom) => {
              console.log(foundRoom, "FOUND ROOM line 61");
              // if(foundRoom){
              runRoom(foundRoom, project._id);
              // }
            })
            .catch((error) => {
              console.log(error, "error rinding room line 65");
            });
        }
      }
        // reCreate(project._id, rooms, clientId, project.__v);
      }
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
const runRoom =  (room: any, newProjectId: string) => {
  let { name, description, clientId, projectId, lights, _id } = room;
  console.log("lights in runRoom: ", lights);

  const newRoom = new Room({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    clientId: clientId,
    projectId: newProjectId,
    description: description,
    lights: [],
  });
  let roomAndProject =  Project.findOne({ _id: newProjectId })
    .exec()
    .then((project) => {
      console.log(project, "project??");
      if (project) {
        project.rooms = [...project.rooms, newRoom._id];
        let newProject = project.save();
        return newProject.then(()=>{
        console.log(project, "PROJECT FOUND AND UPDATED");
        let projectSuccess = `added room to project: ${projectId}`;
        console.log("preSave runRooms newRoom: ", newRoom)
        let savedRoom = newRoom.save()
        console.log("saved newRoom in runRooms: ", savedRoom)
        return savedRoom
          .then((room) => {
            console.log("room success copy: ", room);

            if (room){
              for(let i = 0; i < lights.length; i++){
                let newThing:any = {}
                LightSelection.findOne({_id: lights[i]}).then((light)=>{ 
                  console.log(light, " === light in lights")
                  // if(light){
                  runLights(light, room._id, newProjectId)
                  // newThing = light
                  // }
                })
                // console.log(newThing, "light after transfer")
              }

            }
            // for (let light of lights) {
            //    LightSelection.findOne({ _id: light })
            //     .exec()
            //     .then((foundLight) => {
            //       console.log(foundLight, "FOUND LIGHT line 166");
            //       if(foundLight){
            //       runLights(foundLight, newRoom._id, newProjectId);
            //       }
            //     })
            //     .catch((error) => {
            //       console.log(error, "error rinding light line 170");
            //     });
            // }
            return {
              room,
              message: projectSuccess,
            };})
          })
          .catch((error) => {
            console.log("room error message copy: ", error.message);
            return {
              message: error.message,
              error,
            };
          });
      }
    })
    .catch((error) => {
      return {
        message: error.message,
        error,
      };
    });
  
  return roomAndProject;
};

const runLights =  (
  light: any,
  newRoomId: string,
  newProjectId: string
) => {
  let {
    item_ID,
    exteriorFinish,
    interiorFinish,
    lensMaterial,
    glassOptions,
    acrylicOptions,
    environment,
    safetyCert,
    projectVoltage,
    socketType,
    mounting,
    crystalType,
    crystalPinType,
    crystalPinColor,
    roomName,
    clientId,
    quantity,
  } = light;

  const newLight = new LightSelection({
    _id: new mongoose.Types.ObjectId(),
    item_ID: light.item_ID,
    exteriorFinish: light.exteriorFinish,
    interiorFinish: light.interiorFinish,
    lensMaterial: light.lensMaterial,
    glassOptions: light.glassOptions,
    acrylicOptions: light.acrylicOptions,
    environment:light.environment,
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
    clientId: light.clientId,
    quantity: light.quantity,
  });
  console.log("light before logic: ",light," item_ID: ", item_ID, "newLight: ", newLight)
  let lightAndRoom =  Room.findOne({ _id: newLight.roomId })
    .exec()
    .then((room) => {
      console.log(room, "HIT ROOM IN LIGHTS")
      if (room) {
        room.lights = [...room.lights, newLight._id];
        let savedRoom = room.save();
        console.log("savedRoom: ",savedRoom)
        return savedRoom
              .then(()=>{
                console.log("preSaveNew Light: ",newLight)
                let roomSuccess = newLight.save()//`added light to room: ${newRoomId}`;
                console.log("savedLight: ",roomSuccess)
                return roomSuccess
                      .then((light)=>{
                        console.log("light success copy: ", light);
                        return {
                         message: "work"
                        }
                      }).catch((error) => {
                        console.log("light copy error message: ", error.message);
                        return error(500).json({
                          message: error.message,
                          error,
                        });
                      });

              })

        // return roomSuccess
        //   .then((light) => {
        //     console.log("light success copy: ", light);
        //    return {
        //     message: "work",
        //     roomSuccess
        //    }
        //   })
        //   .catch((error) => {
        //     console.log("light copy error message: ", error.message);
        //     return error(500).json({
        //       message: error.message,
        //       error,
        //     });
        //   });
      }
    })
    .catch((error) => {
      return {
        message: error.message,
        error,
      };
    });
  return lightAndRoom;
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

const reCreate = (
  newProjectId: string,
  rooms: string[],
  clientId: string,
  version: number
) => {
  let newRooms: string[] = [];

  rooms.forEach((roomID: string) => {
    console.log("room in rooms: ", roomID);
    let newID = "";

    return Room.findOne({ _id: roomID })
      .exec()
      .then(async (outerRoom: any) => {
        console.log(outerRoom, "room found");
        let lights: string[] | [];
        await outerRoom;

        const newRoom = new Room({
          _id: new mongoose.Types.ObjectId(),
          name: outerRoom.name + " copy Newest!",
          clientId: clientId,
          projectId: newProjectId,
          description: outerRoom.description,
          lights: [],
        });
        console.log(newRoom, "new room in recreate ");

        // newRoom.save().then((room)=>{
        //   console.log(outerRoom.lights.length, "OUTER ROOM LIGHTS LENGTH")

        await Project.findByIdAndUpdate(newProjectId, { __v: version })
          .exec()
          .then((project) => {
            // await project
            console.log(project, "proj in recreate");
            if (project) {
              project.rooms = project.rooms.length
                ? [...project.rooms, newRoom._id]
                : [newRoom._id];
              project.save();
              console.log("updated project from recreate", newRoom._id);
              return newRoom
                .save()
                .then((room) => {
                  if (outerRoom.lights.length && room) {
                    handleLights(
                      outerRoom.lights,
                      newProjectId,
                      newRoom._id,
                      clientId,
                      newRoom.__v
                    );
                  }
                  return room;
                })
                .catch((error) => {
                  console.log(
                    "error in saving room within recreate: ",
                    error.message
                  );
                });
            }
          })
          .catch((error) => {
            console.log("room error recreate: ", error.message);
          });
      })

      .catch((error) => {
        console.log(error);
      });

    // });
    // console.log(newRooms, "what? new rooms? ")
  });
  return newRooms;
};

const handleLights = (
  lights: string[],
  newProjectID: string,
  newRoomID: string,
  clientId: string,
  version: number
): string[] => {
  let newLights: string[] = [];
  lights.forEach((lightID: string) => {
    console.log("light in lights: ", lightID);

    return LightSelection.findOne({ lightID })
      .exec()
      .then(async (lightSelection: any) => {
        console.log(lightSelection._id, "lightSelections");
        await lightSelection;
        const light = new LightSelection({
          _id: new mongoose.Types.ObjectId(),
          item_ID: lightSelection.item_ID,
          exteriorFinish: lightSelection.exteriorFinish,
          interiorFinish: lightSelection.interiorFinish,
          lensMaterial: lightSelection.lensMaterial,
          glassOptions: lightSelection.glassOptions,
          acrylicOptions: lightSelection.acrylicOptions,
          environment: lightSelection.environment,
          safetyCert: lightSelection.safetyCert,
          projectVoltage: lightSelection.projectVoltage,
          socketType: lightSelection.socketType,
          mounting: lightSelection.mounting,
          crystalType: lightSelection.crystalType,
          crystalPinType: lightSelection.crystalPinType,
          crystalPinColor: lightSelection.crystalPinColor,
          roomName: lightSelection.roomName + " copy NEWEST",
          roomId: newRoomID,
          projectId: newProjectID,
          clientId: clientId,
          quantity: lightSelection.quantity,
        });

        // light.save().then((light)=>{
        //   if(light){
        await Room.findByIdAndUpdate(newRoomID, { __v: version })
          .exec()
          .then((room) => {
            console.log(room, "room in lightsHandler");
            if (room) {
              room.lights = [...room.lights, light._id];
              room.save();
              console.log(
                "updated room from  handleLights",
                [...room.lights],
                light._id
              );
              return light
                .save()
                .then((light) => {
                  return light;
                })
                .catch((error) => {
                  console.log("error in saving light: ", error.message);
                });
            }
          })
          .catch((error) => {
            console.log("light handler error: ", error.message);
          });
      })
      .catch((error) => {
        console.log(error, "errrrrrror light handles");
      });
  });
  // console.log(newID, lightID, "after newguy saver in lights")
  // return newID;

  console.log(newLights, "newLights");
  return newLights;
};
// };

export default {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  getAccountProjects,
};
