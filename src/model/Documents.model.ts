import mongoose, { Schema, Document } from "mongoose";

export interface DocumentSchemaInterface extends Document {
  companyUserId: string;
  title: string;
}

export const DocumentSchema: Schema<DocumentSchemaInterface> =
  new Schema<DocumentSchemaInterface>(
    {
      companyUserId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const DocumentModel =
  (mongoose.models.documentModel as mongoose.Model<DocumentSchemaInterface>) ||
  mongoose.model<DocumentSchemaInterface>("documentModel", DocumentSchema);

export default DocumentModel;
