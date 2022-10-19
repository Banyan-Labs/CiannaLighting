import { Document } from "mongoose";

export interface Schedule {
  date: string;
  notes: string;
  timeFrame: string;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
  subFields: string | string[] | RfpSection[];
}

export interface RfpSection {
  header: string;
  description: string;
  subFields: RfpSection[] | string[] | Contact[];
}

export default interface rfpDocInterface extends Document {
  header: string;
  projectId: string;
  clientId: string;
  schedule: Schedule[];
  scope: string;
  bid: RfpSection[];
  submittals: RfpSection[];
  qualityStandards: RfpSection[];
  contactInfo: Contact[];
  images: string[]; //s3
  pdf: string[]; //s3
}
