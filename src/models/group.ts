import mongoose, { Schema, model, Types, Document } from "mongoose";

export interface IGroup {
  name: string;
  score: number;
}

const GroupSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    score: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
    // para virtuales
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

GroupSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'group',
    justOne: false
});

export default mongoose.model<IGroup>('Group',GroupSchema);

