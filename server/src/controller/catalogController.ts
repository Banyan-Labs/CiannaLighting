import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import logging from "../../config/logging";

import { uploadFunc } from "../middleware/s3";
import CatalogItem from "../model/CatalogItem";
import { AttachmentType } from "../utils/constants";

const createCatalogItem = async (req: Request, res: Response) => {
  let {
    item_ID,
    itemName,
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
    numberOfLamps,
    wattsPerLamp,
    powerInWatts,
    lumens,
    exteriorFinish, //[]
    interiorFinish, //[]
    lensMaterial, //[]
    glassOptions, //[]
    acrylicOptions, //[]
    environment, //[]
    safetyCert, //[]
    projectVoltage, //[]
    socketType, //[]
    mounting, //[]
    crystalType, //[]
    crystalPinType, //[]
    crystalPinColor, //[]
    designStyle, //[]
    usePackages, //[]
    costAdmin,
    partnerCodeAdmin,
  } = req.body;
  let images = [];
  let pdf = [];
  let specs = [];
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
            } else if (singleDoc.field === AttachmentType.PDF) {
              pdf.push(singleDoc.s3Upload.Location);
            } else if (singleDoc.field === AttachmentType.SPEC) {
              specs.push(singleDoc.s3Upload.Location);
            }
          }
        }
      }
    }

    const catalogItem = new CatalogItem({
      _id: new mongoose.Types.ObjectId(),
      isActive: true,
      item_ID,
      itemName,
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
      numberOfLamps,
      wattsPerLamp,
      powerInWatts,
      lumens,
      exteriorFinish, //[]
      interiorFinish, //[]
      lensMaterial, //[]
      glassOptions, //[]
      acrylicOptions, //[]
      environment, //[]
      safetyCert, //[]
      projectVoltage, //[]
      socketType, //[]
      mounting, //[]
      crystalType, //[]
      crystalPinType, //[]
      crystalPinColor, //[]
      designStyle, //[]
      usePackages, //[]
      images, //[]//s3
      pdf, //[]//s3
      specs, //[]//s3
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
            const hasDesignStyle = designStyle ? x.designStyle?.filter((v) => designStyle === v).length > 0 : true;
            const itemUsePackages: any = x.usePackages ? x.usePackages[0] : [];
            const hasUsePackages = usePackages ? usePackages.every((v: string) => itemUsePackages.split(",").includes(v)): true;

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
      key != "pdf" &&
      key != "specs" &&
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
  let { images, pdf, specs, drawingFiles } = req.body; //[]//s3
  images = [];
  pdf = [];
  specs = [];
  drawingFiles = [];

  logging.info(`editBOD: ${JSON.stringify(req.body)}`, "getLight");

  return await CatalogItem.findOne(search)
    .exec()
    .then(async (light: any) => {
      if (light) {
        if (req.files) {
          const documents = Object.values(req.files as any);
      
          const results: any = await uploadFunc(documents, light._item_ID || req.body.item_ID );
          if (results?.length) {
            for (let i = 0; i < results?.length; i++) {
              for (let j = 0; j < results[i].length; j++) {
                const singleDoc = await results[i][j];
                if (singleDoc.field === AttachmentType.IMAGE) {
                  images.push(singleDoc.s3Upload.Location);
                } else if (singleDoc.field === AttachmentType.DRAWING_FILE) {
                  drawingFiles.push(singleDoc.s3Upload.Location);
                } else if (singleDoc.field === AttachmentType.PDF) {
                  pdf.push(singleDoc.s3Upload.Location);
                } else if (singleDoc.field === AttachmentType.SPEC) {
                  specs.push(singleDoc.s3Upload.Location);
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
                case "editpdf":
                  if (pdf.length && parameters[keyName].length) {
                    const paramsSplit = parameters[keyName].split(",");

                    light.pdf = [...pdf, ...paramsSplit];
                  } else if (pdf.length && parameters[keyName].length == 0) {
                    light.pdf = pdf;
                  } else {
                    const paramsSplit = parameters[keyName].length
                      ? parameters[keyName].split(",")
                      : [];

                    light.pdf = paramsSplit;
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
                case "editSpecs":
                  if (specs.length && parameters[keyName].length) {
                    const paramsSplit = parameters[keyName].split(",");

                    light.specs = [...specs, ...paramsSplit];
                  } else if (specs.length && parameters[keyName].length == 0) {
                    light.specs = specs;
                  } else {
                    const paramsSplit = parameters[keyName].length
                      ? parameters[keyName].split(",")
                      : [];

                    light.specs = paramsSplit;
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
