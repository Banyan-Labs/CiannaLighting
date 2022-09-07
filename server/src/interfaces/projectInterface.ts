import { Document } from "mongoose";

export default interface projectInterface extends Document {
  name: string;
  clientId: string;
  description: string;
}
