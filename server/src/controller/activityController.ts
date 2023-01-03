import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Activity from "../model/ActivityLog";

const createActivityLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, userId, ipAddress, role } = req.body;
  console.log(req.body);
  await Activity.findOne({ ipAddress: ipAddress })
    .exec()
    .then((log) => {
      if (log) {
        // console.log(log, 'got it')
        log.ipAddress = ipAddress;
        console.log(log.ipAddress);
        log
          .save()
          .then((updatedLog) => {
            // console.log(updatedLog, 'updated log')
            res.status(201).json({
              updatedLog,
            });
          })
          .catch((error) => {
            return res.status(500).json({
              message: error.message,
              error,
            });
          });
      } else {
        const activityLog = new Activity({
          _id: new mongoose.Types.ObjectId(),
          name,
          userId,
          ipAddress,
          role,
        });

        activityLog.save().then((result) => {
          res.status(201).json({
            log: {
              _id: result.id,
              name: result.name,
              ipAddress: result.ipAddress,
              role: result.role,
            },
          });
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getAllLogs = (req: Request, res: Response) => {
  Activity.find()
    .exec()
    .then((results) => {
      return res.status(200).json({
        logs: results.reverse(),
        count: results.length,
      });
    });
};

const getUserLogs = (req: Request, res: Response) => {
  const { userId } = req.body;
  Activity.findOne({ userId })
    .exec()
    .then((results) => {
      return res.status(200).json({
        logs: results,
      });
    });
};

const deleteLog = async (req: Request, res: Response) => {
  console.log(req.body._id, "delete log");
  await Activity.findOneAndDelete({ _id: req.body._id })
    .then((data) => {
      return res.status(200).json({
        message: `Successfully deleted ${req.body._id}`,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { createActivityLog, getAllLogs, deleteLog };
