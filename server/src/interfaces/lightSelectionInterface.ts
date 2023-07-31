import { Document } from "mongoose";

export default interface lightSelectionInterface extends Document {
  _doc?: any;
  item_ID: string;
  exteriorFinish: string;
  interiorFinish: string;
  lensMaterial: string;
  glassOptions: string;
  acrylicOptions: string;
  environment: string;
  safetyCert: string;
  projectVoltage: string;
  description: string;
  lampType: string;
  lampColor: string;
  price: number;
  wattsPer:  number;
  totalWatts: number;
  numberOfLamps: number;
  totalLumens: number;
  socketType: string;
  mounting: string;
  crystalType: string;
  crystalPinType: string;
  crystalPinColor: string;
  roomName: string;
  roomId: string;
  projectId: string;
  clientId: string;
  quantity: number;
}

export interface lightSelectionCompare {
  _id?: string;
  item_ID: string;
  exteriorFinish: string;
  interiorFinish: string;
  lensMaterial: string;
  glassOptions: string;
  acrylicOptions: string;
  environment: string;
  safetyCert: string;
  projectVoltage: string;
  description: string;
  lampType: string;
  lampColor: string;
  price: number;
  wattsPer:  number;
  totalWatts: number;
  numberOfLamps: number;
  totalLumens: number;
  socketType: string;
  mounting: string;
  crystalType: string;
  crystalPinType: string;
  crystalPinColor: string;
  roomName?: string;
  roomId?: string;
  projectId: string;
  clientId?: string;
  quantity?: number;
}
