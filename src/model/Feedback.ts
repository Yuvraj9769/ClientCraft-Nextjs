import mongoose, { Schema, Document } from "mongoose";

export interface feedBackInterface extends Document {
  senderUserId: string;
  senderUserEmail: string;
  content: string;
}

const feedBackSchema: Schema<feedBackInterface> = new Schema<feedBackInterface>(
  {
    senderUserId: {
      type: String,
      required: true,
    },
    senderUserEmail: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const feedBackModel =
  (mongoose.models.feedBackSchema as mongoose.Model<feedBackInterface>) ||
  mongoose.model<feedBackInterface>("feedBackSchema", feedBackSchema);

export default feedBackModel;
