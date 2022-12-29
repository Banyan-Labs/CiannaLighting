import { Document } from "mongoose";

export default interface Iactivity extends Document {
  name: string;
  userId: string;
  ipAddress: string;
  location: string;
  role: string;
}
