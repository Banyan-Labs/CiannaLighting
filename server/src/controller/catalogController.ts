import { NextFunction, Request, Response } from "express";
import { xor } from "lodash";
import mongoose from "mongoose";
import { checkServerIdentity } from "tls";
import CatalogItem from "../model/CatalogItem";

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
    powerInWatts,
    estimatedWeight,
    price,
    material,
    exteriorFinish, //[]
    interiorFinish, //[]
    lensMaterial, //[]
    glassOptions, //[]
    acrylicOptions, //[]
    environment, //[]
    safetyCert, //[]
    projecVoltage, //[]
    socketType, //[]
    mounting, //[]
    crystalType, //[]
    designStyle, //[]
    usePackages, //[]
    images, //[]//s3
    PDF, //[]//s3
    drawingFiles, //[]//s3
    costAdmin,
    partnerCodeAdmin,
  } = req.body;

  const catalogItem = new CatalogItem({
    _id: new mongoose.Types.ObjectId(),
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
    powerInWatts,
    estimatedWeight,
    price,
    material,
    exteriorFinish, //[]
    interiorFinish, //[]
    lensMaterial, //[]
    glassOptions, //[]
    acrylicOptions, //[]
    environment, //[]
    safetyCert, //[]
    projecVoltage, //[]
    socketType, //[]
    mounting, //[]
    crystalType, //[]
    designStyle, //[]
    usePackages, //[]
    images, //[]//s3
    PDF, //[]//s3
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
  let check = Object.keys(req.body).filter(x=> x === 'designStyle' || x == "usePackages")
  let workArray = Object.fromEntries(check.map(x=> [x, req.body[x]]))

  CatalogItem.find()
    .then((items) => {
      if(check.length){
        let designCheck = check.indexOf('designStyle') > -1;
        let useCheck = check.indexOf('usePackages') > -1 
      items = items.filter(x=>{ 
        let dz = designCheck ? workArray['designStyle'].every((v: string)=> x.designStyle.indexOf(v) > -1) : false
        let uses = useCheck ? workArray['usePackages'].every((v: string)=> x.usePackages.indexOf(v) > -1) : false
        if(check.length === 2){
          if(dz == true && uses == true){
            return x
          }else{
            return ''
          }
        }else{
          if(check.indexOf('designStyle') > -1 && dz == true){
            return x

          }else if(check.indexOf('usePackages') > -1 && uses == true){
            return x
          }else{
            return ''
          }
        }
      })
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
  let keys = Object.keys(req.body).filter((key: string) => key != "_id");
  let parameters = Object.fromEntries(
    keys.map((key: String) => [key, req.body[key.toString()]])
  );
  return await CatalogItem.findOne({ _id: req.body._id })
    .exec()
    .then((light: any) => {
      if (light && keys.length) {
        keys.map((keyName: string) => {
          light[keyName] = parameters[keyName];
        });
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
