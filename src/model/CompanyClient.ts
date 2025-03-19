import mongoose, { Schema, Document, Types } from "mongoose";
import jwt from "jsonwebtoken";

//Client for company data and client user also.

export interface companyClientInterface extends Document {
  name: string;
  email: string;
  dateJoined: Date;
  country: string;
  phone: string;
  Projects: Types.ObjectId[];
  isActive: boolean;
  password: string;
  isCredentialsSend: boolean;
  generateJWTTOken(): Promise<string>;
}

const CompanyClientSchema: Schema<companyClientInterface> =
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
      isActive: {
        type: Boolean,
        default: false,
      },
      isCredentialsSend: {
        type: Boolean,
        default: false,
      },
    },

    {
      timestamps: true,
    }
  );

CompanyClientSchema.methods.generateJWTTOken =
  async function (): Promise<string> {
    return jwt.sign(
      {
        id: this._id,
        role: "companyClient",
      },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "5d" }
    );
  };
const CompanyClientModel =
  (mongoose.models.companyClient as mongoose.Model<companyClientInterface>) ||
  mongoose.model<companyClientInterface>("companyClient", CompanyClientSchema);

export default CompanyClientModel;
