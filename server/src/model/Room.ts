import mongoose, { Schema } from "mongoose";
import lightSelectionInterface from "../interfaces/lightSelectionInterface";
import roomInterface from "../interfaces/roomInterface";

const roomSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    clientId: { type: String, required: true },
    projectId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    lights: {type: Array<lightSelectionInterface>}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<roomInterface>("Room", roomSchema);
// {
//     ...details,
//     lights: {type: Array}
// }
// include all id and name, specs for light 