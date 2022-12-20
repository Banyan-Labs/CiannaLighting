import { Document } from "mongoose";

export default interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  refreshToken: string | null;
}
