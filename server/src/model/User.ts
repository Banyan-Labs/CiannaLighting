import mongoose, { Schema } from "mongoose";
import Iuser from "../interfaces/userInterface";

const userSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, required: true },
    refreshToken: { type: String, select: false },
    isActive: { type: Boolean, default: true },
    resetPasswordRequest: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Iuser>("User", userSchema);
