import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";

export interface ClientInterface extends Document {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  role: string;
  isActive: boolean;
  password: string;
}

export const ClientSchema: Schema<ClientInterface> =
  new Schema<ClientInterface>(
    {
      username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
      },
      firstName: {
        type: String,
        required: [true, "First Name is required"],
      },
      lastName: {
        type: String,
        required: [true, "Last Name is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Please give valid email",
        ],
      },
      phoneNumber: {
        type: String,
        required: [true, "Phone Number is required"],
        match: [
          /^(?:\+?\d{1,3})?[-. ]?(\(?\d{1,4}?\)?[-. ]?)?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}|\d{3,4}[-. ]?\d{3,4}[-. ]?\d{4}$/,
          "Please enter a valid international or national mobile number",
        ],
      },
      companyName: {
        type: String,
        required: [true, "Company Name is required"],
      },
      isActive: {
        type: Boolean,
        default: false,
      },
      role: {
        type: String,
        default: "client",
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },
    },
    { timestamps: true }
  );

ClientSchema.methods.generateJWTTOken = async function (): Promise<string> {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      role: "companyUser",
    },
    process.env.JWT_SECRET_KEY!,
    { expiresIn: "5d" }
  );
};

const clientModel =
  (mongoose.models.Client as mongoose.Model<ClientInterface>) ||
  mongoose.model<ClientInterface>("Client", ClientSchema);

export default clientModel;
