import { Document } from "mongoose";

export interface Schedule {
  date: String;
  notes: String;
  timeFrame: String;
}

export interface Contact {
  name: String;
  email: String;
  phone: String;
  subFields: String | String[] | RfpSection[];
}

export interface RfpSection {
  header: String;
  description: String;
  subFields: RfpSection[] | String[] | Contact[];
}

export default interface rfpDocInterface extends Document {
  header: String;
  projectId: String;
  clientId: String;
  schedule: Schedule[];
  scope: String;
  bid: RfpSection[];
  submittals: RfpSection[];
  qualityStandards: RfpSection[];
  contactInfo: Contact[];
  images: String[]; //s3
  pdf: String[]; //s3
}
