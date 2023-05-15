import mongoose from "mongoose";
import Activity from "../model/ActivityLog";
import type { Request } from "express";
export const createLog = async (req: Request) => {
  const ipAddress = req.ip;
  const { name, userId, role } = req.body;
  await Activity.findOne({ ipAddress: ipAddress })
    .exec()
    .then((log) => {
      if (log) {
        log.ipAddress = ipAddress;
        log
          .save()
          .then((updatedLog) => {
            return updatedLog;
          })
          .catch((error) => {
            throw error.message;
          });
      } else {
        const activityLog = new Activity({
          _id: new mongoose.Types.ObjectId(),
          name,
          userId,
          ipAddress,
          role,
        });

        activityLog.save().then((result: any) => {
          return {
            _id: result.id,
            name: result.name,
            ipAddress: result.ipAddress,
            role: result.role,
          };
        });
      }
    })
    .catch((error: any | unknown) => {
      throw error;
    });
};
