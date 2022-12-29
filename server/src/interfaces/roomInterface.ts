import { Document } from "mongoose";

export default interface roomInterface extends Document {
  name: string;
  clientId: string;
  projectId: string;
  description: string;
  lights: string[];
}
