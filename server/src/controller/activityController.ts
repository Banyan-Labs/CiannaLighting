import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Activity from "../model/ActivityLog";

/**
 *
 * @deprecated createActivityLog
 * replaced by
 * @function createLog
 * TODO: Remove after version 1.0
 */
const createActivityLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, userId, ipAddress, role } = req.body;
  await Activity.findOne({ ipAddress: ipAddress })
    .exec()
    .then((log) => {
      if (log) {
        log.ipAddress = ipAddress;
        log
          .save()
          .then((updatedLog) => {
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

const createLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, userId, ipAddress, role } = req.body;
    const log = await Activity.findOne({ userId }).then(
      (activityLog) => activityLog
    );
    if (!log || log.ipAddress !== ipAddress) {
      const newLog = new Activity({ name, userId, ipAddress, role });
      await newLog.save();
      return res.status(201).json({ log: newLog });
    } else {
      const logUpdate = Activity.findOneAndUpdate(
        { userId },
        { ipAddress },
        { new: true }
      );
      return res.status(200).json({ log: logUpdate });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

const getAllLogs = (req: Request, res: Response) => {
  Activity.find()
    // .exec()
    .then((results) => {
      return res.status(200).json({
        logs: results,
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

export default {
  createActivityLog,
  getAllLogs,
  deleteLog,
  getUserLogs,
  createLog,
};
