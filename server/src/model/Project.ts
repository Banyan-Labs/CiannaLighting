import mongoose, { Schema } from "mongoose";
import projectInterface from "../interfaces/projectInterface";

const projectSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true },
    clientId: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<projectInterface>("Project", projectSchema);
