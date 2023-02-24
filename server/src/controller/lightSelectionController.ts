import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import LightSelection from "../model/LIghtSelection";
import { LightREF } from "../interfaces/projectInterface";
import Project from "../model/Project";
import Room from "../model/Room";
import { longString } from "aws-sdk/clients/datapipeline";

const lightSelected = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
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
    roomId,
    projectId,
    clientId,
    quantity,
    price,
    description,
    lampType,
    lampColor,
    wattsPer,
    totalWatts,
    numberOfLamps,
    totalLumens,
  } = req.body.light;

  const light = new LightSelection({
    _id: new mongoose.Types.ObjectId(),
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
    roomId,
    projectId,
    clientId,
    quantity,
    price,
    description,
    lampType,
    lampColor,
    wattsPer,
    totalWatts,
    numberOfLamps,
    totalLumens,
  });
  const lightAndRoom = await Room.findByIdAndUpdate({ _id: roomId })
    .exec()
    .then((room) => {
      if (room) {
        room.lights = [...room.lights, light._id];
        room.save();
        const roomSuccess = `added light to room: ${roomId}`;
        return light
          .save()
          .then(async (light) => {
            if (light) {
              console.log("adding before call", projectId, item_ID, roomName)
              const finished = await lightIdService(projectId, 'add', item_ID, roomName);
              if(finished){
                console.log("finished update: ", light)
              }
              return res.status(201).json({
                light,
                message: roomSuccess,
              });
            }
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

  return lightAndRoom;
};

const getAllSelectedLights = (req: Request, res: Response) => {
  const { roomId, item_ID } = req.body;
  if (roomId && roomId.length) {
    LightSelection.find({ roomId })
      .then((lights) => {
        return res.status(200).json({
          lights,
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error });
      });
  } else {
    LightSelection.find({ item_ID })
      .then((lights) => {
        return res.status(200).json({
          lights,
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error });
      });
  }
};
const getSelectedLight = async (req: Request, res: Response) => {
  const keys = Object.keys(req.body).filter((key: string) => key != "_id");
  const parameters = Object.fromEntries(
    keys.map((key: string) => [key, req.body[key.toString()]])
  );
  return await LightSelection.findOne({ _id: req.body._id })
    .exec()
    .then((light: any) => {
      if (light && keys.length) {
        keys.map((keyName: string) => {
          light[keyName] = parameters[keyName];
        });
        light.save();
      }
      return res.status(200).json({
        light,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const deleteSelectedLight = async (req: Request, res: Response) => {
  type RequestBody = {
    item_ID: string;
    roomId: string;
    _id: string;
    projectId: string;
  }
  const { item_ID, roomId, _id, projectId }: RequestBody = req.body;
  return await Room.findByIdAndUpdate({ _id: req.body.roomId })
    .exec()
    .then(async (room) => {
      if (room) {
        const updateLightIds = await lightIdService(projectId, 'delete', item_ID, room.name);
        if ( updateLightIds ){
          console.log("lightIDs updated!@#$#@!")
        }
        room.lights = room.lights.filter((id: string) => {
          return String(id) !== _id ? id : "";
        });
        room.save();
        const lightRemoved = "light removed successfully from room";
        return await LightSelection.findByIdAndDelete({ _id: _id })
          .then((lightSelection) => {
            return !lightSelection
              ? res.status(200).json({
                  lightSelection,
                })
              : res.status(404).json({
                  message:
                    "The light selection you are looking for no longer exists",
                  lightRemoved,
                });
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      } else {
        return "failed to delete light from room";
      }
    });
};

export const lightIdService = async (
  projectId: string,
  type: string,
  item_ID: string,
  room: string
) => {
  console.log("adding AFTER call", projectId, item_ID, room)
  const project = await Project.findOne({_id: projectId });
  if (project) {
    console.log("PROJ lightService in add: ", project);
    const lightIDs = project.lightIDs;
    //need to make something to add to the end of the array if there is stuff in there but you need to add a new room and itemid thing 
    if (lightIDs && lightIDs.length) {
      console.log("In lightIDS if statement: ", lightIDs);
      const reWrite: LightREF[] = lightIDs
        .map((item: LightREF): LightREF => {
          if (item.item_ID === item_ID) {
            if (type === "add") {
              console.log('in the ADD section of the lightIdService!')
              const newItem = { ...item, rooms: [...item.rooms, room] };
              return newItem;
            } else if (type === "delete") {
              console.log('In the delte secion of the lightIdService!')
              console.log("Item rooms before delete: ", item, item.rooms);
              const deletingRooms =
                item.rooms && item.rooms.length
                  ? item.rooms.filter(
                      (roomName: string, index: number, copy: string[]) =>
                        roomName.toLowerCase() === room.toLowerCase()
                          ? index === copy.lastIndexOf(roomName)
                            ? ""
                            : roomName
                          : roomName
                    )
                  : [];
                  console.log("DeletingRooms Variable: ", deletingRooms);
              if (deletingRooms.length) {
                console.log("In the deltingrooms length if statement!")
                const newItem = { ...item, rooms: deletingRooms };
                console.log("New deleted rooms item: ", newItem);
                return newItem;
              } else {
                return { item_ID: "", rooms: [] };
              }
            } else {
              return item;
            }
          } else {
            return item;
          }
        })
        .filter((item) => item.item_ID.length && item.rooms.length);
      console.log("REWRITE variable: ", reWrite);
      console.log("project light Ids before reWriting: ", project.lightIDs);
      const checkForId = project.lightIDs.find(item=> item.item_ID === item_ID);
      console.log("id check",checkForId)
      if(checkForId == undefined){
        const lightIdAddOn = [...project.lightIDs, { item_ID: item_ID, rooms: [room] }]
        console.log("Adding onto lightIDS: ", lightIdAddOn)
        project.lightIDs = lightIdAddOn;
        console.log("proj lightIDS after refactoring with add on: ", project.lightIDs)
      }else{
      project.lightIDs = reWrite;
      }
      console.log("projLIghtIds: ", project.lightIDs);
    } else {
      project.lightIDs = [{ item_ID: item_ID, rooms: [room] }];
    }

    const done = await project.save();
    if (done) {
      console.log("Done and Saved successfully: ", done, done.lightIDs)
      return done;
    } else {
      console.log("Error in lightID service with saving.")
      throw new Error(
        "Error saving project in the add section of lightIdService."
      );
    }
  } else {
    console.log("couldnt find project in lightIdService")
    throw new Error(
      "Error finding project in the add section of lightIdService."
    );
  }
};

export default {
  lightSelected,
  getAllSelectedLights,
  deleteSelectedLight,
  getSelectedLight
};
