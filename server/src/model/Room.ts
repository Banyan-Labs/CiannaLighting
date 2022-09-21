import mongoose, { Schema } from "mongoose";
import roomInterface from "../interfaces/roomInterface";

const roomSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    clientId: { type: String, required: true },
    projectId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    lights: {type: Array<string>}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<roomInterface>(
  "Room", 
  roomSchema
  );
  