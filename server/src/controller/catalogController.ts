import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import logging from "../../config/logging";

import { uploadFunc } from "../middleware/s3";
import CatalogItem from "../model/CatalogItem";
import { AttachmentType } from "../utils/constants";

const createCatalogItem = async (req: Request, res: Response) => {
  let {
    item_ID,
    employeeID,
    itemDescription,
    bodyDiameter,
    bodyLength,
    bodyWidth,
    bodyHeight,
    fixtureOverallHeight,
    sconceHeight,
    sconceWidth,
    sconceExtension,
    socketQuantity,
    estimatedWeight,
    price,
    material,
    lampType,
    lampColor,
    lumens,
    exteriorFinish, //[]
    finishTreatment, //[]
    interiorFinish, //[]
    lensMaterial, //[]
    environment, //[]
    safetyCert, //[]
    projectVoltage, //[]
    socketType, //[]
    mounting, //[]
    crystalType, //[]
    treatment, //[]
    cystalBulbCover, //[]
    crystalPinColor, //[]
    designStyle, //[]
    usePackages, //[]
    costAdmin,
    partnerCodeAdmin,
  } = req.body;
  let images = [];
  let renderings = [];
  let cutSheets = [];
  let drawingFiles = [];
  const existingCatalog = await CatalogItem.findOne({ item_ID });

  logging.info(`existingCatalog: ${existingCatalog}`, "createCatalogItem")

  if (existingCatalog) {
    return res.status(400).json({
      message: "This Item already exists.",
    });
  } else {
    if (req.files) {
      const documents = Object.values(req.files as any);
      const results: any = await uploadFunc(documents, item_ID);

      if (results?.length) {
        for (let i = 0; i < results?.length; i++) {
          for (let j = 0; j < results[i].length; j++) {
            const singleDoc = await results[i][j];

            if (singleDoc.field === AttachmentType.IMAGE) {
              images.push(singleDoc.s3Upload.Location);
            } else if (singleDoc.field === AttachmentType.DRAWING_FILE) {
              drawingFiles.push(singleDoc.s3Upload.Location);
            } else if (singleDoc.field === AttachmentType.RENDERING) {
              renderings.push(singleDoc.s3Upload.Location);
            } else if (singleDoc.field === AttachmentType.CUT_SHEET) {
              cutSheets.push(singleDoc.s3Upload.Location);
            }
          }
        }
      }
    }

    const catalogItem = new CatalogItem({
      _id: new mongoose.Types.ObjectId(),
      isActive: true,
      item_ID,
      employeeID,
      itemDescription,
      bodyDiameter,
      bodyLength,
      bodyWidth,
      bodyHeight,
      fixtureOverallHeight,
      sconceHeight,
      sconceWidth,
      sconceExtension,
      socketQuantity,
      estimatedWeight,
      price,
      material,
      lampType,
      lampColor,
      lumens,
      exteriorFinish, //[]
      finishTreatment, //[]
      interiorFinish, //[]
      lensMaterial, //[]
      environment, //[]
      safetyCert, //[]
      projectVoltage, //[]
      socketType, //[]
      mounting, //[]
      crystalType, //[]
      treatment, //[]
      cystalBulbCover, //[]
      crystalPinColor, //[]
      designStyle, //[]
      usePackages, //[]
      images, //[]//s3
      renderings, //[]//s3
      cutSheets, //[]//s3
      drawingFiles, //[]//s3
      costAdmin,
      partnerCodeAdmin,
    });

    return await catalogItem
      .save()
      .then((item) => {
        return res.status(201).json({
          item,
        });
      })
      .catch((error) => {
        logging.error(error.message, "createCatalogItem");
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
  }
};

const getCatalogItems = (req: Request, res: Response, next: NextFunction) => {
  const { designStyle, usePackages } = req.body;

  CatalogItem.find()
    .then((items) => {
      if (items) {
        if (designStyle || usePackages) {
          items = items.filter((x) => {
            const hasDesignStyle = designStyle ? x.designStyle.includes(designStyle) : true;
            const hasUsePackages = usePackages?.length ?
              usePackages.length > 1
                ? usePackages.every((v: string) => x.usePackages.includes(v))
                : x.usePackages.includes(usePackages[0])
              : true;

            return hasDesignStyle && hasUsePackages;
          });
        }

        return res.status(200).json({
          items,
        });
      } else {
        return res.status(204).json({
          message: "No items found",
        });
      }
    })
    .catch((error) => {
      logging.error(error.message, "getCatalogItems");
      return res.status(500).json({ message: error.message, error });
    });
};

const getLight = async (req: Request, res: Response, next: NextFunction) => {
  const keys = Object.keys(req.body).filter(
    (key: string) =>
      key != "_id" &&
      key != "item_ID" &&
      key != "authEmail" &&
      key != "images" &&
      key != "renderings" &&
      key != "cutSheets" &&
      key != "drawingFiles" &&
      key != "authRole"
  );
  const search =
    req.body.item_ID && req.body.item_ID.length
      ? { item_ID: req.body.item_ID }
      : { _id: req.body._id };
  const parameters = Object.fromEntries(
    keys.map((key: string) => [key, req.body[key.toString()]])
  );
  let images: any[] = [];
  let renderings: any[] = [];
  let cutSheets: any[] = [];
  let drawingFiles: any[] = [];

  logging.info(`editBOD: ${JSON.stringify(req.body)}`, "getLight");

  return await CatalogItem.findOne(search)
    .exec()
    .then(async (light: any) => {
      if (light) {
        if (req.files) {
          const documents = Object.values(req.files as any);

          const results: any = await uploadFunc(documents, light._item_ID || req.body.item_ID);
          if (results?.length) {
            for (let i = 0; i < results?.length; i++) {
              for (let j = 0; j < results[i].length; j++) {
                const singleDoc = await results[i][j];
                if (singleDoc.field === AttachmentType.IMAGE) {
                  images.push(singleDoc.s3Upload.Location);
                } else if (singleDoc.field === AttachmentType.DRAWING_FILE) {
                  drawingFiles.push(singleDoc.s3Upload.Location);
                } else if (singleDoc.field === AttachmentType.RENDERING) {
                  renderings.push(singleDoc.s3Upload.Location);
                } else if (singleDoc.field === AttachmentType.CUT_SHEET) {
                  cutSheets.push(singleDoc.s3Upload.Location);
                } else {
                  next();
                }
              }
            }
          }
        }

        logging.info(`lightFound: ${JSON.stringify(light)}`, "getLight");
        if (keys.length) {
          keys.map((keyName: string) => {
            if (/edit/.test(keyName)) {
              switch (keyName) {
                case "editImages":
                  if (images.length) {
                    const paramsSplit = parameters[keyName].split(",");

                    light.images = [...images, ...paramsSplit].filter((x) => x);
                  } else if (images.length && parameters[keyName].length == 0) {
                    light.images = images;
                  } else {
                    const paramsSplit = parameters[keyName].length
                      ? parameters[keyName].split(",")
                      : [];

                    light.images = paramsSplit;
                  }
                  break;
                case "editRenderings":
                  if (renderings.length && parameters[keyName].length) {
                    const paramsSplit = parameters[keyName].split(",");

                    light.renderings = [...renderings, ...paramsSplit];
                  } else if (renderings.length && parameters[keyName].length == 0) {
                    light.renderings = renderings;
                  } else {
                    const paramsSplit = parameters[keyName].length
                      ? parameters[keyName].split(",")
                      : [];

                    light.renderings = paramsSplit;
                  }
                  break;
                case "editDrawingFiles":
                  if (drawingFiles.length && parameters[keyName].length) {
                    const paramsSplit = parameters[keyName].split(",");

                    light.drawingFiles = [...drawingFiles, ...paramsSplit];
                  } else if (drawingFiles.length && parameters[keyName].length == 0) {
                    light.drawingFiles = drawingFiles;
                  } else {
                    const paramsSplit = parameters[keyName].length
                      ? parameters[keyName].split(",")
                      : [];

                    light.drawingFiles = paramsSplit;
                  }
                  break;
                case "editCutSheets":
                  if (cutSheets.length && parameters[keyName].length) {
                    const paramsSplit = parameters[keyName].split(",");

                    light.cutSheets = [...cutSheets, ...paramsSplit];
                  } else if (cutSheets.length && parameters[keyName].length == 0) {
                    light.cutSheets = cutSheets;
                  } else {
                    const paramsSplit = parameters[keyName].length
                      ? parameters[keyName].split(",")
                      : [];

                    light.cutSheets = paramsSplit;
                  }
                  break;
                default:
                  null;
                  break;
              }
            } else {
              light[keyName] = parameters[keyName];
            }
          });
          for (const key in light) {
            if (
              Array.isArray(light[key]) &&
              light[key].length === 1 &&
              /\,/g.test(light[key][0])
            ) {
              light[key] = light[key][0].split(",");
            }
          }
          light.save();
        }
        return res.status(200).json({
          light,
        });
      } else {
        next();
      }
    })
    .catch((error) => {
      logging.error(error.message, "getLight");
      return res.status(500).json({ message: error.message, error });
    });
};

const removeLight = async (req: Request, res: Response) => {
  return await CatalogItem.findByIdAndDelete({ _id: req.body._id })
    .exec()
    .then((light) => {
      return !light
        ? res.status(200).json(light)
        : res.status(404).json({
          message: "The Catalog item you are looking for no longer exists",
        });
    })
    .catch((error) => {
      logging.error(error.message, "removeLight");
      return res.status(500).json(error);
    });
};

export default { createCatalogItem, getCatalogItems, getLight, removeLight };
