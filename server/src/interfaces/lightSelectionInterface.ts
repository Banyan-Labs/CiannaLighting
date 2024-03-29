import { Document } from "mongoose";

export default interface lightSelectionInterface extends Document {
  _doc?: any;
  item_ID: string;
  exteriorFinish: string;
  finishTreatment: string;
  interiorFinish: string;
  lensMaterial: string;
  environment: string[];
  safetyCert: string[];
  mounting: string[];
  projectVoltage: string;
  description: string;
  lampColor: string;
  price: number;
  totalLumens: string;
  socketType: string;
  crystalType: string;
  treatment: string;
  crystalBulbCover: string;
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
  finishTreatment: string;
  interiorFinish: string;
  lensMaterial: string;
  environment: Array<string>;
  safetyCert: Array<string>;
  mounting: Array<string>;
  projectVoltage: string;
  description: string;
  lampColor: string;
  price: number;
  totalLumens: string;
  socketType: string;
  crystalType: string;
  treatment: string;
  crystalBulbCover: string;
  crystalPinColor: string;
  roomName?: string;
  roomId?: string;
  projectId: string;
  clientId?: string;
  quantity?: number;
}
