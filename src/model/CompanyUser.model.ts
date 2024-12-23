import mongoose, { Schema, Document, Types } from "mongoose";
import jwt from "jsonwebtoken";

export interface CompanyUserInterface extends Document {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  department: string;
  Clients?: Types.ObjectId[];
  projects: Types.ObjectId[];
  documents: Types.ObjectId[];
  isActive?: boolean;
  password: string;
  role: string;
  profilePic: string;
  todos: Types.ObjectId[];
  passwordResetToken: string | undefined;
  passwordResetTokenExpiry: Date | undefined;
  generateJWTTOken(): Promise<string>;
}

export const CompanyUserSchema: Schema<CompanyUserInterface> =
  new Schema<CompanyUserInterface>(
    {
      username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
      },

      firstName: {
        type: String,
        required: [true, "First Name is required"],
      },

      profilePic: {
        type: String,
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

      companyName: {
        type: String,
        required: [true, "Company Name is required"],
      },

      phoneNumber: {
        type: String,
        required: [true, "Phone Number is required"],
        match: [
          /^(?:\+?\d{1,3})?[-. ]?(\(?\d{1,4}?\)?[-. ]?)?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}|\d{3,4}[-. ]?\d{3,4}[-. ]?\d{4}$/,
          "Please enter a valid international or national mobile number",
        ],
      },

      department: {
        type: String,
        required: [true, "Department is required"],
      },

      Clients: [
        {
          type: Schema.Types.ObjectId,
          ref: "companyClient",
        },
      ],

      todos: [
        {
          type: Schema.Types.ObjectId,
          ref: "Todo",
        },
      ],

      projects: [
        {
          type: Schema.Types.ObjectId,
          ref: "Project",
        },
      ],

      documents: [
        {
          type: Schema.Types.ObjectId,
          ref: "documentModel",
        },
      ],

      isActive: {
        type: Boolean,
        default: false,
      },
      role: {
        type: String,
        default: "companyUser",
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      passwordResetToken: {
        type: String || undefined,
      },
      passwordResetTokenExpiry: {
        type: Date || undefined,
      },
    },

    { timestamps: true }
  );

CompanyUserSchema.methods.generateJWTTOken =
  async function (): Promise<string> {
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

const CompanyUserModel =
  (mongoose.models.CompanyUser as mongoose.Model<CompanyUserInterface>) ||
  mongoose.model<CompanyUserInterface>("CompanyUser", CompanyUserSchema);

export default CompanyUserModel;
