import mongoose, { Schema } from 'mongoose';
import Iuser from '../interfaces/userInt';

// const Schema = mongoose.Schema;

const userSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    isAuth: { type: Boolean },
    role: { type: String, required: true },
    refreshToken: { type: String, select: false },
  },
  {
    timestamps: true,
  }
);
/**
 * Super Admin
 * Employee
 * user
 */

export default mongoose.model<Iuser>('User', userSchema);
