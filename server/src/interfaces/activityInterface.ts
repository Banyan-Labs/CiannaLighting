import { Document } from "mongoose";

export default interface Iactivity extends Document {
  _id: string;
  name: string;
  userId: string;
  ipAddress: string;
  location: string;
  role: string;
}
