import mongoose, { Schema, Document } from "mongoose";

export interface ProjectInterface extends Document {
  clientName: string;
  projectName: string;
  status: string;
  budget: string;
}

const projectSchema: Schema<ProjectInterface> = new Schema<ProjectInterface>(
  {
    clientName: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Completed", "Active", "Pending"],
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const projectModel =
  (mongoose.models.Project as mongoose.Model<ProjectInterface>) ||
  mongoose.model<ProjectInterface>("Project", projectSchema);

export default projectModel;
