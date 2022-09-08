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
  designStyle: string;
  usePackages: string;
  quantity: number;
}
