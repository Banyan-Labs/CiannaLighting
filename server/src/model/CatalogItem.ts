import mongoose, { Schema } from "mongoose";
import catalogInterface from "../interfaces/catalogInterface";

const catalogItemScema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  item_ID: { type: String, required: true },
  itemName: { type: String, required: true },
  employeeID: { type: String, required: true },
  itemDescription: { type: String, required: true },
  bodyDiameter: { type: String, required: true },
  bodyLength: { type: String, required: true },
  bodyWidth: { type: String, required: true },
  bodyHeight: { type: String, required: true },
  fixtureOverallHeight: { type: String, required: true },
  sconceHeight: { type: String, required: true },
  sconceWidth: { type: String, required: true },
  sconceExtension: { type: String, required: true },
  socketQuantity: { type: Number, required: true },
  estimatedWeight: { type: Number, required: true },
  price: { type: Number, required: true },
  material: { type: String, required: true },
  lampType: { type: String, required: true },
  lampColor: { type: String, required: true },
  numberOfLamps: { type: String, required: true },
  wattsPerLamp: { type: String, required: true },
  powerInWatts: { type: Number, required: true },
  lumens: { type: String, required: true },
  exteriorFinish: { type: Array<string>, required: true },
  interiorFinish: { type: Array<string>, required: true },
  lensMaterial: { type: Array<string>, required: true },
  glassOptions: { type: Array<string>, required: true },
  acrylicOptions: { type: Array<string>, required: true },
  environment: { type: Array<string>, required: true },
  safetyCert: { type: Array<string>, required: true },
  projectVoltage: { type: Array<number>, required: true },
  socketType: { type: Array<string>, required: true },
  mounting: { type: Array<string>, required: true },
  crystalType: { type: Array<string>, required: true },
  crystalPinType: { type: Array<string>, required: true },
  crystalPinColor: { type: Array<string>, required: true },
  designStyle: { type: Array<string>, required: true },
  usePackages: { type: Array<string>, required: true },
  images: { type: Array<string>, required: true }, //s3
  pdf: { type: Array<string>, required: true }, //s3
  specs: { type: Array<string>, required: true }, //s3
  drawingFiles: { type: Array<string>, required: true }, //s3 remember to add the light profile pic to light selection
  costAdmin: { type: Number, required: true },
  partnerCodeAdmin: { type: String, required: true },
});

export default mongoose.model<catalogInterface>(
  "CatalogItem",
  catalogItemScema
);
