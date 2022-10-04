import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import statusAndRegion from "../model/statusAndRegion";

const addInfo = (req: Request, res: Response, next: NextFunction) => {
  let { label, value } = req.body;

  const data = new statusAndRegion({
    label,
    value,
  });

  return data
    .save()
    .then((data) => {
      return res.status(201).json({
        label: data.label,
        value: data.value,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getData = async (req: Request, res: Response, next: NextFunction) => {
  let { label } = req.body;
  await statusAndRegion
    .find({ label })
    .exec()
    .then((data) => {
      return res.status(200).json({
        data: data.map((x) => x.value),
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const deleteData = async (req: Request, res: Response, next: NextFunction) => {
  let { label, value } = req.body;

  await statusAndRegion
    .findOneAndDelete({ label, value })
    .then((data) => {
      return res.status(200).json({
        message: `Successfully deleted ${data?.value}`,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { addInfo, getData, deleteData };
