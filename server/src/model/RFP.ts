import mongoose, { Schema } from "mongoose";
import rfpDocInterface, {
  Schedule,
  RfpSection,
  Contact,
} from "../interfaces/rfpDocInterface";
const rfpSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    projectId: { type: String, required: true },
    clientId: { type: String, required: true },
    header: { type: String, required: true },
    schedule: { type: Array<Schedule>, required: true },
    scope: { type: String, required: true },
    bid: { type: Array<RfpSection>, required: true },
    submittals: { type: Array<RfpSection>, required: true },
    qualityStandards: { type: Array<RfpSection>, required: true },
    contactInfo: { type: Array<Contact>, required: true },
    images: { type: Array<string>, required: true },
    pdf: { type: Array<string>, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<rfpDocInterface>("RFP", rfpSchema);
