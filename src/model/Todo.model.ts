import mongoose, { Schema, Document } from "mongoose";

export interface todoInterface extends Document {
  title: string;
  description: string;
}

const todoSchema: Schema<todoInterface> = new Schema<todoInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const todoModel =
  (mongoose.models.Todo as mongoose.Model<todoInterface>) ||
  mongoose.model<todoInterface>("Todo", todoSchema);

export default todoModel;
