import mongoose, { Schema, Document } from "mongoose";

export interface feedBackInterface extends Document {
  senderUserId: string;
  senderUserEmail: string;
  content: string;
}

const FeedBackSchema: Schema<feedBackInterface> = new Schema<feedBackInterface>(
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

const FeedBackModel =
  (mongoose.models.feedBackSchema as mongoose.Model<feedBackInterface>) ||
  mongoose.model<feedBackInterface>("feedBackSchema", FeedBackSchema);

export default FeedBackModel;
