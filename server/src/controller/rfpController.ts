import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Project from "../model/Project";
import { uploadFunc } from "../middleware/s3";
import RFP from "../model/RFP";

const createRfp = async (req: Request, res: Response, next: NextFunction) => {
  const {
    header,
    projectId,
    clientId,
    schedule,
    scope,
    bid,
    submittals,
    qualityStandards,
    contactInfo,
  } = req.body;
  let {images, pdf} = req.body // []/s3
  const documents = Object.values(req.files as any);

  const results = await uploadFunc(documents);
  images = [];
  pdf = [];
  if (results?.length) {
    for (let i = 0; i < results?.length; i++) {
      for (let j = 0; j < results[i].length; j++) {
        const singleDoc = await results[i][j];

        if (singleDoc.field === "images") {
          images.push(singleDoc.s3Upload.Location);
        } else if (singleDoc.field === "pdf") {
          pdf.push(singleDoc.s3Upload.Location);
        }
      }
    }
  }
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
    images,
    pdf,
  });
  const rfpAndProject = await Project.findByIdAndUpdate({ _id: projectId })
    .exec()
    .then((project) => {
      if (project) {
        project.rfp = rfp._id;
        project.save();

        const projectSuccess = `added rfp to project: ${projectId}`;
        return rfp
          .save()
          .then((rfp) => {
            return res.status(201).json({
              rfp,
              projectSuccess,
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
  const keys = Object.keys(req.body).filter((key: string) => key != "_id");
  const parameters = Object.fromEntries(
    keys.map((key: string) => [key, req.body[key.toString()]])
  );
  return await RFP.findOne({ _id: req.body._id })
    .exec()
    .then((rfp: any) => {
      if (rfp && keys.length) {
        keys.map((keyName: string) => {
          rfp[keyName] = parameters[keyName];
        });
      }
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
        const rfpRemoved = "rfp removed successfully from project";
        return await RFP.findByIdAndDelete({ _id: req.body._id })
          .then((rfp) => {
            return !rfp
              ? res.status(200).json({
                  rfp,
                })
              : res.status(404).json({
                  message:
                    "The rfp document you are looking for no longer exists",
                  rfpRemoved,
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
