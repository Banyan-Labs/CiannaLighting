import mongoose, { Schema } from "mongoose";
import {ProposalTableRow, Room, Finish} from "../interfaces/rfpDocInterface";
const proposalRowSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    sub: { type: String },
    projectId: { type: String, required: true },
    lightID: { type: String, required: true },
    itemID: { type: String, required: true },
    description: {type: String, required: true},
    lampType: {type: String, required: true},
    lampColor: {type: String, required: true},
    price: {type: Number, required: true}, 
    lightQuantity: {type: Number, required: true}, 
    wattsPer:  {type: Number, required: true}, 
    totalWatts: {type: Number, required: true}, 
    numberOfLamps: {type: Number, required: true}, 
    totalLumens: {type: Number, required: true}, 
    finishes: { type: Object, required: true },
    rooms: {type: Array<Room>, required: true},
    subTableRow: { type: Array<string>, required: true }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ProposalTableRow>("ProposalRow", proposalRowSchema);