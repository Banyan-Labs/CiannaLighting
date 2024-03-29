import { Document } from "mongoose";

interface ProjectActivity {
  createUpdate: string;
  rooms: string[][];
  archiveRestore: string[][];
  status: string[][];
}

export interface LightREF {
  item_ID: string;
  rooms: string[]
}
export default interface projectInterface extends Document {
  archived: boolean;
  name: string;
  clientId: string;
  clientName: string;
  region: string;
  status: string;
  description: string;
  rooms: string[];
  lightIDs: LightREF[] | [];
  activity: ProjectActivity;
}
