import mongoose, { Schema } from "mongoose";
import projectInterface from "../interfaces/projectInterface";
import roomInterface from "../interfaces/roomInterface";
import rfpDocInterface from "../interfaces/rfpDocInterface";

const projectSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true },
    clientId: { type: String, required: true },
    clientName: {type: String, required: true},
    region: {type: String, required: true},
    status: {type: String, required: true},
    description: { type: String, required: true },
    rfp: {type: Object},
    rooms: { type: Array<roomInterface>},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<projectInterface>("Project", projectSchema);

// name: string;
// clientId: string;
// clientName: string;
// region: string;
// status: string;
// description: string;
// rfp: rfpDocInterface;
// rooms: string[];