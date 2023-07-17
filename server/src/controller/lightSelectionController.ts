import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import LightSelection from "../model/LightSelection";
import CatalogItem from "../model/CatalogItem";
import { LightREF } from "../interfaces/projectInterface";
import Project from "../model/Project";
import Room from "../model/Room";
import { ActionType } from "../utils/constants";
import logging from "../../config/logging";
import ProjectAttachments from "../model/ProjectAttachments";

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

        return light
          .save()
          .then(async (light) => {
            if (light) {
              logging.info(`Sending following values to lightIdService: projectId = ${projectId}, item_ID = ${item_ID}, roomName = ${roomName}`, "lightSelected");
              const finished = await lightIdService(
                projectId,
                ActionType.ADD,
                item_ID,
                roomName
              );

              if (finished) {
                logging.info(`Finished update of light: ${JSON.stringify(light)}`, "lightSelected");
              }

              return res.status(201).json({
                light,
                message: `added light to room: ${roomId}`,
              });
            }
          })
          .catch((error) => {
            logging.error(error.message, "lightSelected");
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
      logging.error(error.message, "lightSelected");
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
        logging.error(error.message, "getAllSelectedLights");
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
        logging.error(error.message, "getAllSelectedLights");
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
      logging.error(error.message, "getSelectedLight");
      return res.status(500).json({ message: error.message, error });
    });
};

const deleteSelectedLight = async (req: Request, res: Response) => {
  type RequestBody = {
    item_ID: string;
    roomId: string;
    _id: string;
    projectId: string;
  };
  const { item_ID, roomId, _id, projectId }: RequestBody = req.body;

  return await Room.findByIdAndUpdate({ _id: roomId })
    .exec()
    .then(async (room) => {
      if (room) {
        const updateLightIds = await lightIdService(
          projectId,
          ActionType.DELETE,
          item_ID,
          room.name
        );

        if (updateLightIds) {
          logging.info(`LightId updated for item_id ${item_ID} in room ${room.name} of project ${projectId}`, "deleteSelectedLight");
        }

        room.lights = room.lights.filter((id: string) => {
          return String(id) !== _id ? id : "";
        });

        room.save();

        return await LightSelection.findByIdAndDelete({ _id: _id })
          .then((lightSelection) => {
            // is the following logic correct? 
            return !lightSelection
              ? res.status(200).json({
                lightSelection,
              })
              : res.status(404).json({
                message: "The light selection you are looking for no longer exists",
                lightRemoved: "light removed successfully from room",
              });
          })
          .catch((error) => {
            logging.error(error.message, "deleteSelectedLight");
            res.status(500).json(error);
          });
      } else {
        return res.status(204).json({ message: `No room found using _id of #${roomId}.` });
      }
    });
};

export const lightIdService = async (
  projectId: string,
  type: ActionType,
  item_ID: string,
  room: string
) => {
  logging.info(`LightIdService called with projectId: ${projectId}, type: ${type}, item_ID: ${item_ID}, room: ${room}`, "lightIdService");
  const project = await Project.findOne({ _id: projectId });

  if (project) {
    const lightIDs = project.lightIDs;
    //need to make something to add to the end of the array if there is stuff in there but you need to add a new room and itemid thing

    if (lightIDs && lightIDs.length) {
      const reWrite: LightREF[] = lightIDs
        .map((item: LightREF): LightREF => {
          if (item.item_ID === item_ID) {
            if (type === ActionType.ADD) {
              const newItem = { ...item, rooms: [...item.rooms, room] };

              return newItem;
            } else if (type === ActionType.DELETE) {
              const deletingRooms = item?.rooms?.length ? item.rooms.filter((roomName: string) => roomName !== room) : [];
              logging.info(`deletingRooms: ${JSON.stringify(deletingRooms)}`, "lightIdService");

              if (deletingRooms.length) {
                logging.info(`deletingRooms found`, "lightIdService");
                const newItem = { ...item, rooms: deletingRooms };
                logging.info(`newItem: ${JSON.stringify(newItem)}`, "lightIdService");

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

      logging.info(`reWrite variable: ${JSON.stringify(reWrite)}`, "lightIdService");
      logging.info(`project light Ids before reWriting: ${JSON.stringify(project.lightIDs)}`, "lightIdService");

      const checkForId = project.lightIDs.find(
        (item) => item.item_ID === item_ID
      );
      logging.info(`checkForId: ${JSON.stringify(checkForId)}`, "lightIdService");

      if (checkForId == undefined) {
        const lightIdAddOn = [
          ...project.lightIDs,
          { item_ID: item_ID, rooms: [room] },
        ];
        logging.info(`lightIdAddOn: ${JSON.stringify(lightIdAddOn)}`, "lightIdService");

        project.lightIDs = lightIdAddOn;
        logging.info(`project light Ids after reWriting: ${JSON.stringify(project.lightIDs)}`, "lightIdService");
      } else {
        project.lightIDs = reWrite;
      }
    } else {
      project.lightIDs = [{ item_ID, rooms: [room] }];
    }

    logging.info(`project light Ids after reWriting: ${JSON.stringify(project.lightIDs)}`, "lightIdService");

    const done = await project.save();

    if (type === ActionType.DELETE) {
      await CatalogItem.find({})
      .then((catalogItems) => {
        let specDict: any = {};

        for (let item of catalogItems) {
          for (let spec of item.specs) {
            specDict[spec] = item.item_ID.toString();
          }
        }


        ProjectAttachments.findOne({ projectId: projectId })
          .then(async (projectAttachments: any) => {
            const specFiles: any[] = projectAttachments?.pdf;

            logging.info(`exisitng specFiles: ${JSON.stringify(specFiles)}`, "lightIdService");

            specFiles?.forEach((specFile: any) => {
              const lightId: string = specDict[specFile];
              const existingLightIds: string[] = project.lightIDs.map((item: any) => item.item_ID);
              logging.info(`lightId: ${lightId}`, "lightIdService");
              logging.info(`existingLightIds: ${JSON.stringify(existingLightIds)}`, "lightIdService");

              if (!existingLightIds.includes(lightId)) {
                projectAttachments.pdf = projectAttachments.pdf.filter((file: any) => file !== specFile);
              }
            });

            await projectAttachments.save();
          });
      });
    }

    if (done) {
      logging.info(`Done and Saved successfully: ${JSON.stringify(done)}`, "lightIdService");

      return done;
    } else {
      logging.error(`Error saving project in the add section of lightIdService.`, "lightIdService");
      throw new Error(
        "Error saving project in the add section of lightIdService."
      );
    }
  } else {
    logging.error(`Error finding project in the add section of lightIdService.`, "lightIdService");
    throw new Error(
      "Error finding project in the add section of lightIdService."
    );
  }
};

export default {
  lightSelected,
  getAllSelectedLights,
  deleteSelectedLight,
  getSelectedLight,
};
