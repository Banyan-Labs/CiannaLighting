import { Document } from "mongoose";

export default interface lightSelectionInterface extends Document {
  item_ID: string;
  exteriorFinish: string;
  interiorFinish: string;
  lensMaterial: string;
  glassOptions: string;
  acrylicOptions: string;
  environment: string;
  safetyCert: string;
  projecVoltage: string;
  socketType: string;
  mounting: string;
  crystalType: string;
  crystalPinType: string;
  crystalPinColor: string;
  usePackages: string;
  roomId: string;
  projectId: string;
  quantity: number;
}
