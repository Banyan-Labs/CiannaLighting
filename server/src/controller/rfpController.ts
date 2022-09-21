import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Project from "../model/Project";
import RFP from "../model/RFP";

const createRfp = async (req: Request, res: Response, next: NextFunction) => {
  let {
    header,
    projectId,
    clientId,
    schedule,
    scope,
    bid,
    submittals,
    qualityStandards,
    contactInfo,
    lights,
    attachments,
  } = req.body;

  const rfp = new RFP({
    _id: new mongoose.Types.ObjectId(),
    header,
    projectId,
    clientId,
    schedule,
    scope,
    bid,
    submittals,
    qualityStandards,
    contactInfo,
    lights,
    attachments,
  });
  let rfpAndProject = await Project.findByIdAndUpdate({ _id: projectId })
    .exec()
    .then((project) => {
      if (project) {
        project.rfp = rfp._id;
        project.save();
        let projectSuccess = `added rfp to project: ${projectId}`;
        return rfp
          .save()
          .then((rfp) => {
            return res.status(201).json({
              rfp,
              projectSuccess
            });
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

  return rfpAndProject;
};

const findRFP = async (req: Request, res: Response) => {
  return await RFP.findOne({ _id: req.body._id })
    .exec()
    .then((rfp) => {
      return res.status(200).json({
        rfp,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const getAccountRFPS = async (req: Request, res: Response) => {
  return await RFP.find({ clientId: req.body.clientId })
    .exec()
    .then((rfp) => {
      return res.status(200).json({
        rfp,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};
const getRFPS = async (req: Request, res: Response) => {
  return await RFP.find()
    .exec()
    .then((rfp) => {
      return res.status(200).json({
        rfp,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const deleteRFP = async (req: Request, res: Response, next: NextFunction) => {
  return await Project.findByIdAndUpdate({ _id: req.body.projectId })
    .exec()
    .then(async (project) => {
      if (project) {
        project.rfp = "";
        project.save();
        let rfpRemoved = "rfp removed successfully from project";
        return await RFP.findByIdAndDelete({ _id: req.body._id })
          .then((rfp) => {
            return !rfp
              ? res.status(200).json({
                  rfp
                })
              : res.status(404).json({
                  message: "The rfp document you are looking for no longer exists",
                  rfpRemoved
                });
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      } else {
        next();
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

export default { createRfp, getRFPS, getAccountRFPS, findRFP, deleteRFP };
