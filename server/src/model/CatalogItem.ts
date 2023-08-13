import mongoose, { Schema } from "mongoose";
import catalogInterface from "../interfaces/catalogInterface";

const catalogItemScema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  item_ID: { type: String, required: true },
  employeeID: { type: String, required: false },
  itemDescription: { type: String, required: false },
  bodyDiameter: { type: String, required: false },
  bodyLength: { type: String, required: false },
  bodyWidth: { type: String, required: false },
  bodyHeight: { type: String, required: false },
  fixtureOverallHeight: { type: String, required: false },
  sconceHeight: { type: String, required: false },
  sconceWidth: { type: String, required: false },
  sconceExtension: { type: String, required: false },
  socketQuantity: { type: Number, required: false },
  estimatedWeight: { type: Number, required: false },
  price: { type: Number, required: false },
  material: { type: String, required: false },
  lampColor: { type: String, required: false },
  lumens: { type: String, required: false },
  environment: { type: Array<string>, required: false },
  safetyCert: { type: Array<string>, required: false },
  mounting: { type: Array<string>, required: false },
  exteriorFinish: { type: String, required: false },
  finishTreatment: { type: String, required: false },
  interiorFinish: { type: String, required: false },
  lensMaterial: { type: String, required: false },
  projectVoltage: { type: String, required: false },
  socketType: { type: String, required: false },
  crystalType: { type: String, required: false },
  treatment: { type: String, required: false },
  crystalBulbCover: { type: String, required: false },
  crystalPinColor: { type: String, required: false },
  designStyle: { type: String, required: false },
  usePackages: { type: Array<string>, required: false },
  images: { type: Array<string>, required: false }, //s3
  renderings: { type: Array<string>, required: false }, //s3
  cutSheets: { type: Array<string>, required: false }, //s3
  drawingFiles: { type: Array<string>, required: false }, //s3
  costAdmin: { type: Number, required: false },
  partnerCodeAdmin: { type: String, required: false },
  isActive: { type: Boolean, required: false },
});

export default mongoose.model<catalogInterface>(
  "CatalogItem",
  catalogItemScema
);
