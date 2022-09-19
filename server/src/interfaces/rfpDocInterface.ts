import { Document } from "mongoose";

interface Schedule {
    date: string;
    notes: string;
    timeFrame: string;
}

interface Contact{
  name: string;
  email: string;
  phone: string;
  subFields: string|string[];
}

interface RfpSection{
  description: string;
  subFields: RfpSection[] | string[] | Contact[];
}


export default interface rfpDocInterface extends Document {
  schedule: Schedule;
  scope: string;
  bid: RfpSection;
  submittals: RfpSection;
  qualityStandards: RfpSection;
  contactInfo: Contact[];
  lights: string[]; //s3
}