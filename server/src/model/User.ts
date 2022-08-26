import mongoose, { Schema } from "mongoose";
import Iuser from "../interfaces/userInt";

// const Schema = mongoose.Schema;

const userSchema: Schema = new Schema(
  {
    _id: {type: mongoose.Types.ObjectId},
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Iuser>("User", userSchema);
