import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import LightSelection from "../model/LightSelection"
import Room from "../model/Room";
import Project from "../model/Project";

const lightSelected = async(req: Request, res: Response, next: NextFunction) => {
    let { item_ID,
        exteriorFinish,
        interiorFinish,
        lensMaterial,
        glassOptions,
        acrylicOptions,
        environment,
        safetyCert,
        projecVoltage,
        socketType,
        mounting,
        crystalType,
        crystalPinType,
        crystalPinColor,
        usePackages,
        roomId,
        projectId,
        quantity } = req.body;

const light = new LightSelection({
      _id: new mongoose.Types.ObjectId(),
      item_ID,
      exteriorFinish,
      interiorFinish,
      lensMaterial,
      glassOptions,
      acrylicOptions,
      environment,
      safetyCert,
      projecVoltage,
      socketType,
      mounting,
      crystalType,
      crystalPinType,
      crystalPinColor,
      usePackages,
      roomId,
      projectId,
      quantity
      
  });
  console.log(roomId)
  let lightAndRoom = await Room.findByIdAndUpdate({_id: roomId})
  .exec()
  .then((room)=>{
    console.log(room, "Room")
    if(room){
        room.lights = [...room.lights, light._id]
        room.save()
        let roomSuccess = `added light to room: ${roomId}`
        return room
        .save()
        .then((room) => {
          return res.status(201).json({
            room,
            message: roomSuccess
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: error.message,
            error,
          });
        })
    }
    else{
        next()
    }
  })
  .catch((error) => {
    console.log(roomId, error.message, "fail")
    return res.status(500).json({
      message: error.message,
      error,
    });
  })
return lightAndRoom

};

const getAllSelectedLights = (req: Request, res: Response) => {
  LightSelection.find()
    .then((lights) => {
      return res.status(200).json({
        lights,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const deleteSelectedLight = async(req: Request, res: Response) => {
  return await Room.findByIdAndUpdate({_id: req.body.projectId})
  .exec()
  .then(async(room)=>{
    
    if(room){
      room.lights = room.lights.filter((id: string)=>{ 
        return String(id) !== req.body._id ? id : ""
      })
      room.save();
      await Project.findByIdAndUpdate({_id: req.body.projectId})
    
    }
      let roomRemoved = "room removed successfully from project";
      console.log(roomRemoved)
    return  await LightSelection.findByIdAndDelete({_id:req.body._id})
    .then((room) => {
      console.log(room, req.body._id, "room within delete response")
      return !room
        ? res.status(200).json({
          room,
        
        })
        : res.status(404).json({
            message: "The Room you are looking for no longer exists",
            roomRemoved
          });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
    // }else{
      console.log("failed to delete room from project")
      return "failed to delete room from project"
    // }
  })
  
};