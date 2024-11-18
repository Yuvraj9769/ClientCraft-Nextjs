import mongoose, { Schema, Document, Types } from "mongoose";

//Client for company data.

export interface companyClientInterface extends Document {
  name: string;
  email: string;
  dateJoined: Date;
  country: string;
  phone: string;
  Projects: Types.ObjectId[];
}

const companyClientSchema: Schema<companyClientInterface> =
  new Schema<companyClientInterface>(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
      },
      dateJoined: {
        type: Date,
        default: Date.now,
      },
      country: {
        type: String,
        required: [true, "Country is requred"],
      },
      phone: {
        type: String,
        required: true,
      },
      Projects: [
        {
          type: Schema.Types.ObjectId,
          ref: "Project",
        },
      ],
    },
    {
      timestamps: true,
    }
  );

const companyClientModel =
  (mongoose.models.companyClient as mongoose.Model<companyClientInterface>) ||
  mongoose.model<companyClientInterface>("companyClient", companyClientSchema);

export default companyClientModel;
