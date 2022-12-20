import { Document } from "mongoose";

export default interface catalogInterface extends Document {
  item_ID: string;
  itemName: string;
  employeeID:string;
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
  lampType: string;
  lampColor: string;
  numberOfLamps: string;
  wattsPerLamp: string;
  powerInWatts: number;
  lumens: string;
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
  crystalType: string[];// add to model add some stuff
  crystalPinType: string[];
  crystalPinColor: string[];
  designStyle: string[];
  usePackages: string[];
  images: string[]; //s3
  pdf: string[]; //s3
  specs: string[];
  drawingFiles: string[]; //s3
  costAdmin: number;
  partnerCodeAdmin: string;
}
