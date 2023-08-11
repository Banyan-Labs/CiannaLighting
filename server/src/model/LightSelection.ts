import mongoose, { Schema } from "mongoose";
import lightSelectionInterface from "../interfaces/lightSelectionInterface";

const lightSelectionSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  clientId: { type: String, required: false },
  roomId: { type: String, required: false },
  projectId: { type: String, required: false },
  item_ID: { type: String, required: true },
  description: { type: String, required: false },
  lampColor: { type: String, required: false },
  price: { type: Number, required: false },
  totalLumens: { type: String, required: false },
  exteriorFinish: { type: String, required: false },
  finishTreatment: { type: String, required: false },
  interiorFinish: { type: String, required: false },
  lensMaterial: { type: String, required: false },
  environment: { type: String, required: false },
  safetyCert: { type: String, required: false },
  projectVoltage: { type: String, required: false },
  socketType: { type: String, required: false },
  mounting: { type: String, required: false },
  crystalType: { type: String, required: false },
  treatment: { type: String, required: false },
  crystalBulbCover: { type: String, required: false },
  crystalPinColor: { type: String, required: false },
  roomName: { type: String, required: false },
  quantity: { type: Number, required: false },
});

export default mongoose.model<lightSelectionInterface>(
  "LightSelection",
  lightSelectionSchema
);
