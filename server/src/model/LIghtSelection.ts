import mongoose, { Schema } from "mongoose";
import lightSelectionInterface from "../interfaces/lightSelectionInterface";

const lightSelectionSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  clientId: { type: String, required: true },
  roomId: { type: String, required: true },
  projectId: { type: String, required: true },
  item_ID: { type: String, required: true },
  exteriorFinish: { type: String, required: true },
  interiorFinish: { type: String, required: true },
  lensMaterial: { type: String, required: true },
  glassOptions: { type: String, required: true },
  acrylicOptions: { type: String, required: true },
  environment: { type: String, required: true },
  safetyCert: { type: String, required: true },
  projectVoltage: { type: String, required: true },
  socketType: { type: String, required: true },
  mounting: { type: String, required: true },
  crystalType: { type: String, required: true },
  crystalPinType: { type: String, required: true },
  crystalPinColor: { type: String, required: true },
  roomName: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.model<lightSelectionInterface>(
  "LightSelection",
  lightSelectionSchema
);
