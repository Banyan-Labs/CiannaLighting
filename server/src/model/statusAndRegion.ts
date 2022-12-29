import mongoose, { Schema } from "mongoose";
import statusAndRegion from "../interfaces/statusAndRegion";

const statusAndRegionSchema: Schema = new Schema({
  label: { type: String },
  value: { type: String },
});

export default mongoose.model<statusAndRegion>(
  "statusAndRegion",
  statusAndRegionSchema
);
