import { Document } from "mongoose";

export default interface catalogInterface extends Document {
  item_ID: string;
  employeeID: string;
  itemDescription: string;
  bodyDiameter: string;
  bodyLength: string;
  bodyWidth: string;
  bodyHeight: string;
  fixtureOverallHeight: string;
  sconceHeight: string;
  sconceWidth: string;
  sconceExtension: string;
  socketQuantity: number;
  estimatedWeight: number;
  price: number;
  material: string;
  lampColor: string;
  lumens: string;
  environment: string[];
  safetyCert: string[];
  mounting: string[];
  exteriorFinish: string;
  finishTreatment: string;
  interiorFinish: string;
  lensMaterial: string;
  projectVoltage: string;
  socketType: string;
  crystalType: string;
  treatment: string;
  crystalBulbCover: string;
  crystalPinColor: string;
  designStyle: string;
  usePackages: string[];
  images: string[]; //s3
  renderings: string[]; //s3
  cutSheets: string[];
  drawingFiles: string[]; //s3
  costAdmin: number;
  partnerCodeAdmin: string;
  isActive: boolean;
}
