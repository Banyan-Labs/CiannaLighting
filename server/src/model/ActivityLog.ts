import mongoose, { Schema } from "mongoose";
import Iactivity from "../interfaces/activityInterface";

const activitySchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    ipAddress: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Iactivity>("Activity", activitySchema);
