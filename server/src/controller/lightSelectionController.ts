import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import LightSelection from "../model/LightSelection";
import Project from "../model/Project";
import Room from "../model/Room";
import { ActionType } from "../utils/constants";
import logging from "../../config/logging";
import { lightSelectionCompare } from "../interfaces/lightSelectionInterface";
import roomController from "./roomController";

const lightSelected = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    item_ID,
    exteriorFinish,
    finishTreatment,
    interiorFinish,
    lensMaterial,
    environment,
    safetyCert,
    projectVoltage,
    socketType,
    mounting,
    crystalType,
    treatment,
    cystalBulbCover,
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
    totalLumens,
  } = req.body.light;
  const light = new LightSelection({
    _id: new mongoose.Types.ObjectId(),
    item_ID,
    exteriorFinish,
    finishTreatment,
    interiorFinish,
    lensMaterial,
    environment,
    safetyCert,
    projectVoltage,
    socketType,
    mounting,
    crystalType,
    treatment,
    cystalBulbCover,
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
    totalLumens,
  });

  const room = await Room.findById({ _id: roomId })
    .exec()
    .then(async (room) => {
      if (room) {
        room.lights = [...room.lights, light._id];
        await room.save();

        return await light
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

  return room;
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
        room.lights = room.lights.filter((id: string) => {
          return String(id) !== _id ? id : "";
        });

        await room.save();

        const updateLightIds = await lightIdService(
          projectId,
          ActionType.DELETE,
          item_ID,
          room.name
        );

        if (updateLightIds) {
          logging.info(`LightId updated for item_id ${item_ID} in room ${room.name} of project ${projectId}`, "deleteSelectedLight");
        }

        return await LightSelection.findByIdAndDelete({ _id: _id })
          .then((lightSelection) => {

            return !lightSelection
              ? res.status(200).json({
                lightSelection,
              })
              : res.status(200).json({
                message: "light removed successfully from room",
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
    project.lightIDs = await roomController.updateLightIds(project);

    const done = await project.save();

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

export const getLightSelectionsForProject = async (req: Request, res: Response) => {
  const { projectId } = req.body;

  if (!projectId) {
    return res.status(400).json({ message: "Missing projectId" });
  }

  try {
    const lightSelections = await LightSelection.find({ projectId });
    let groupedSelections: { [key: string]: any } = {};

    lightSelections.forEach(selection => {
      let selectionCopy = { ...selection._doc } as lightSelectionCompare;
      let roomQuantity = selectionCopy.quantity;
      let roomName = selectionCopy.roomName;

      delete selectionCopy._id;
      delete selectionCopy.roomId;
      delete selectionCopy.roomName;
      delete selectionCopy.quantity;
      delete selectionCopy.clientId;

      const groupKey = JSON.stringify(selectionCopy);

      if (!groupedSelections[groupKey]) {
        groupedSelections[groupKey] = { ...selectionCopy, rooms: [`${roomName} (${roomQuantity})`] };
        groupedSelections[groupKey].lightQuantity = roomQuantity;
      } else {
        groupedSelections[groupKey].rooms.push(`${roomName} (${roomQuantity})`);
        groupedSelections[groupKey].lightQuantity += roomQuantity;
      }

      groupedSelections[groupKey].rooms.sort();
    });

    let selections = Object.values(groupedSelections);

    selections.sort((a: any, b: any) => a.item_ID.localeCompare(b.item_ID));

    return res.status(200).json({ lightSelections: selections });
  } catch (error) {
    logging.error(error, "getLightSelectionsForProject");
    return res.status(500).json({ message: "Error getting light selections for project" });
  }
}

export default {
  lightSelected,
  getAllSelectedLights,
  deleteSelectedLight,
  getSelectedLight,
  getLightSelectionsForProject
};
