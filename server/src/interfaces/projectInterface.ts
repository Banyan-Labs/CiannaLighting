import { Document } from "mongoose";

interface activity {}

interface ProjectActivity {
  createUpdate: string;
  rooms: string[][];
  archiveRestore: string[][];
  status: string[][];
}
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
  activity: ProjectActivity;
}
