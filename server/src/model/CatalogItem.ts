import mongoose, { Schema } from "mongoose";
import catalogInterface from "../interfaces/catalogInterface";

const catalogItemScema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  item_ID: { type: String, required: true },
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
  lumens: { type: String, required: true },
  environment: { type: Array<string>, required: true },
  safetyCert: { type: Array<string>, required: true },
  mounting: { type: Array<string>, required: true },
  exteriorFinish: { type: String, required: true },
  finishTreatment: { type: String, required: true },
  interiorFinish: { type: String, required: true },
  lensMaterial: { type: String, required: true },
  projectVoltage: { type: String, required: true },
  socketType: { type: String, required: true },
  crystalType: { type: String, required: true },
  treatment: { type: String, required: true },
  crystalBulbCover: { type: String, required: true },
  crystalPinColor: { type: String, required: true },
  designStyle: { type: String, required: true },
  usePackages: { type: Array<string>, required: true },
  images: { type: Array<string>, required: true }, //s3
  renderings: { type: Array<string>, required: true }, //s3
  cutSheets: { type: Array<string>, required: true }, //s3
  drawingFiles: { type: Array<string>, required: true }, //s3 remember to add the light profile pic to light selection
  costAdmin: { type: Number, required: true },
  partnerCodeAdmin: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});

export default mongoose.model<catalogInterface>(
  "CatalogItem",
  catalogItemScema
);
