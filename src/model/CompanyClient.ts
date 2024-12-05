import mongoose, { Schema, Document, Types } from "mongoose";

//Client for company data and client user also.

export interface companyClientInterface extends Document {
  name: string;
  email: string;
  dateJoined: Date;
  country: string;
  phone: string;
  Projects: Types.ObjectId[];
  password: string;
  isCredentialsSend: boolean;
  passordResetToken: string;
  passordResetTokenExpiry: Date;
}

const companyClientSchema: Schema<companyClientInterface> =
  new Schema<companyClientInterface>(
    {
      name: {
        type: String,
        unique: true,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      dateJoined: {
        type: Date,
        default: () => Date.now(),
      },
      country: {
        type: String,
        required: [true, "Country is requred"],
      },
      phone: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        default: "",
      },
      Projects: [
        {
          type: Schema.Types.ObjectId,
          ref: "Project",
        },
      ],
      isCredentialsSend: {
        type: Boolean,
        default: false,
      },
      passordResetToken: {
        type: String,
      },
      passordResetTokenExpiry: {
        type: Date,
        default: () => Date.now(),
      },
    },

    {
      timestamps: true,
    }
  );

const companyClientModel =
  (mongoose.models.companyClient as mongoose.Model<companyClientInterface>) ||
  mongoose.model<companyClientInterface>("companyClient", companyClientSchema);

export default companyClientModel;
