import mongoose, { Schema } from "mongoose";
import rfpDocInterface from "../interfaces/rfpDocInterface";
const rfpSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    header: { type: String, required: true },
    projectId: { type: String, required: true },
    clientId: { type: String, required: true },
    clientName: { type: String, required: true },
    tableRow: { type: Array<string>, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<rfpDocInterface>("RFP", rfpSchema);
