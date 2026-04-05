import mongoose, { Schema, model, Types, Document, Mongoose } from "mongoose";
import { IGroup } from "./group";

export interface IUser {
  _id?: string
  name: string;
  email: string;
  password: string;
  group?: mongoose.Types.ObjectId | string;
  role: 'normal' | 'admin';
}


const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    group: {type: Schema.Types.ObjectId, ref: 'Group'},
    role: {type: String, required: true, enum: ['user', 'admin'], default: 'user'}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IUser>('User',UserSchema);
