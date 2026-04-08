import mongoose, { Schema, model, Types, Document, Mongoose } from "mongoose";
import { IGroup } from "./group";
import bcrypt from "bcryptjs";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  group?: mongoose.Types.ObjectId | string;
  role: "normal" | "admin";

  // encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

/*
UserSchema.methods.encryptPassword = async function (
  password: string,
): Promise<string> {
  const salt = await bcrypt.genSalt(10); // el algoritmo se aplica 10 veces
  return bcrypt.hash(password, salt);
};
*/

export async function encryptPassword( password: string) : Promise<string>{
  const salt = await bcrypt.genSalt(10); // el algoritmo se aplica 10 veces
  return bcrypt.hash(password, salt);
}

UserSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
