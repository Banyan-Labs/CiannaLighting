import { Document } from "mongoose";

export default interface projectInterface extends Document {
  archived: boolean;
  name: string;
  clientId: string;
  clientName: string;
  region: string;
  status: string;
  description: string;
  rfp: string;
  rooms: string[];
}
