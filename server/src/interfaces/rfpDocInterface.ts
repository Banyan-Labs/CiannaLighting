import { Document } from "mongoose";

interface Schedule {
    date: string;
    notes: string;
    timeFrame: string;
}

export default interface rfpDocInterface extends Document {
  schedule: Schedule;
  scope: string;
  bid: string;
  submittals: string;
  qualityStandards: string;
  contactInfo: string;
  lights: string[];
}