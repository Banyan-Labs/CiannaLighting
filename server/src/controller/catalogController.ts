import { Request, Response } from "express";
import { isArray } from "lodash";
import mongoose from "mongoose";
import { uploadFunc } from "../middleware/s3";
import CatalogItem from "../model/CatalogItem";

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

  let { images, pdf, specs, drawingFiles } = req.body; //[]//s3
  images = [];
  pdf = [];
  specs = [];
  drawingFiles = [];
  if (req.files) {
    const documents = Object.values(req.files as any);

    const results = await uploadFunc(documents);
    if (results?.length) {
      for (let i = 0; i < results?.length; i++) {
        for (let j = 0; j < results[i].length; j++) {
          const singleDoc = await results[i][j];

          if (singleDoc.field === "images") {
            images.push(singleDoc.s3Upload.Location);
          } else if (singleDoc.field === "drawingFiles") {
            drawingFiles.push(singleDoc.s3Upload.Location);
          } else if (singleDoc.field === "pdf") {
            pdf.push(singleDoc.s3Upload.Location);
          } else if (singleDoc.field === "specs") {
            specs.push(singleDoc.s3Upload.Location);
          }
        }
      }
    }
  }

  const catalogItem = new CatalogItem({
    _id: new mongoose.Types.ObjectId(),
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
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getCatalogItems = (req: Request, res: Response) => {
  const check = Object.keys(req.body).filter(
    (x) => x === "designStyle" || x == "usePackages"
  );
  const workArray = Object.fromEntries(check.map((x) => [x, req.body[x]]));
  CatalogItem.find()
    .then((items) => {
      if (check.length) {
        const designCheck = check.indexOf("designStyle") > -1;
        const useCheck = check.indexOf("usePackages") > -1;
        items = items.filter((x) => {
          const dz = designCheck
            ? workArray["designStyle"].every(
                (v: string) =>
                  x.designStyle[0]
                    .split(",")
                    .map((x) => x.toLowerCase())
                    .indexOf(v) > -1
              )
            : false;
          const uses = useCheck
            ? workArray["usePackages"].every((v: string) => {
                const usePackage = v.match(/[a-z]/g)?.join("");
                return x.usePackages[0]
                  .split(",")
                  .some(
                    (x) =>
                      x.toLowerCase().match(/[a-z]/g)?.join("") == usePackage
                  );
              })
            : false;
          if (check.length === 2) {
            if (dz == true && uses == true) {
              return x;
            } else {
              return "";
            }
          } else {
            if (check.indexOf("designStyle") > -1 && dz == true) {
              return x;
            } else if (check.indexOf("usePackages") > -1 && uses == true) {
              return x;
            } else {
              return "";
            }
          }
        });
      }
      return res.status(200).json({
        items,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const getLight = async (req: Request, res: Response) => {
  const keys = Object.keys(req.body).filter(
    (key: string) =>
      key != "_id" &&
      key != "item_ID" &&
      key != "authEmail" &&
      key != "authRole"
  );
  const search =
    req.body.item_ID && req.body.item_ID.length
      ? { item_ID: req.body.item_ID }
      : { _id: req.body._id };
  const parameters = Object.fromEntries(
    keys.map((key: string) => [key, req.body[key.toString()]])
  );

  return await CatalogItem.findOne(search)
    .exec()
    .then((light: any) => {
      if (light && keys.length) {
        keys.map((keyName: string) => {
          light[keyName] = parameters[keyName];
        });
        light.save();
      }

      console.log(`Catalog Item: ${light?.item_ID} retrieved`);
      return res.status(200).json({
        light,
      });
    })
    .catch((error) => {
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
      return res.status(500).json(error);
    });
};

export default { createCatalogItem, getCatalogItems, getLight, removeLight };
