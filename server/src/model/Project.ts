import mongoose, { Schema } from "mongoose";
import projectInterface from "../interfaces/projectInterface";

const projectSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    archived: { type: Boolean },
    name: { type: String, required: true },
    clientId: { type: String, required: true },
    clientName: { type: String, required: true },
    region: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    rfp: { type: String },
    rooms: { type: Array<string> },
    activity: { type: Object },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<projectInterface>("Project", projectSchema);
