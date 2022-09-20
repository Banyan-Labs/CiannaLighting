import { Document } from "mongoose";

export default interface catalogInterface extends Document {
  item_ID: string;
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
  powerInWatts: number;
  estimatedWeight: number;
  price: number;
  material: string;
  exteriorFinish: string[];
  interiorFinish: string[];
  lensMaterial: string[];
  glassOptions: string[];
  acrylicOptions: string[];
  environment: string[];
  safetyCert: string[];
  projecVoltage: string[];
  socketType: string[];
  mounting: string[];
  crystalType: string[];
  designStyle: string[];
  usePackages: string[];
  images: string[]; //s3
  PDF: string[]; //s3
  drawingFiles: string[]; //s3
  costAdmin: number;
  partnerCodeAdmin: string;
}