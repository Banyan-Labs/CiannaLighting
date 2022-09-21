import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import CatalogItem from "../model/CatalogItem";

const createCatalogItem = async (req: Request, res: Response)=>{
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
    } = req.body

    const catalogItem =  new CatalogItem({
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
    })
    return await catalogItem
           .save()
           .then((item)=>{
            return res.status(201).json({
                item
            })
           })
           .catch((error)=>{
            return res.status(500).json({
                message: error.message,
                error,
              });
           })
}

const getCatalogItems = (req: Request, res: Response) => {
    CatalogItem.find()
      .then((items) => {
        return res.status(200).json({
          items,
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error });
      });
  };

const getLight = async (req: Request, res: Response) =>{
  return await CatalogItem.findOne({_id: req.body._id})
        .exec()
        .then((light)=>{
        console.log(`Catalog Item: ${light?.item_ID} retrieved`)
        return res.status(200).json({
          light
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error });
      });

}

const removeLight = async (req:Request, res: Response) =>{
    return await CatalogItem.findByIdAndDelete({_id: req.body._id})
            .exec()
            .then((light)=>{
                return !light
                ? res.status(200).json(light)
                : res.status(404).json({
                    message: "The Catalog item you are looking for no longer exists",
                  });
            })
            .catch((error) => {
                return res.status(500).json(error);
              });
}

export default {createCatalogItem, getCatalogItems, getLight, removeLight};
