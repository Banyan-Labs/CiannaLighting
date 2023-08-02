import { Request, Response } from "express";

import logging from "../../config/logging";
import statusAndRegion from "../model/statusAndRegion";

const addInfo = async (req: Request, res: Response) => {
  const { label, value } = req.body;
  const data = new statusAndRegion({
    label,
    value,
  });

  try {
    const data_1 = await data
      .save();
    return res.status(201).json({
      label: data_1.label,
      value: data_1.value,
    });
  } catch (error: any) {
    logging.error(error.message, "addInfo");
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

const getData = async (req: Request, res: Response) => {
  const { label } = req.body;

  await statusAndRegion
    .find({ label })
    .exec()
    .then((data) => {
      return res.status(200).json({
        data: data.map((x) => x.value),
      });
    })
    .catch((error) => {
      logging.error(error.message, "getData");
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const deleteData = async (req: Request, res: Response) => {
  const { label, value } = req.body;

  await statusAndRegion
    .findOneAndDelete({ label, value })
    .then((data) => {
      return res.status(200).json({
        message: `Successfully deleted ${data?.value}`,
      });
    })
    .catch((error) => {
      logging.error(error.message, "deleteData");
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { addInfo, getData, deleteData };
