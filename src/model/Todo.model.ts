import mongoose, { Schema, Document } from "mongoose";

export interface todoInterface extends Document {
  title: string;
  description: string;
  isDone: boolean;
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
    isDone: {
      type: Boolean,
      default: false,
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
