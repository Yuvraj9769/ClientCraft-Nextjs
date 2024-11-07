/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnet";
import bcrypt from "bcryptjs";
import CompanyUserModel, {
  CompanyUserInterface,
} from "@/model/CompanyUser.model";
import companyUserSignUpValidator from "@/schemas/companyUserSignup";
import { z } from "zod";
import sendMail from "@/utils/sendMail";

const userSchemaValidator = z.object({
  data: companyUserSignUpValidator,
});

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    const {
      username,
      firstName,
      lastName,
      email,
      companyName,
      phoneNumber,
      department,
      password,
    } = userData;

    if (
      [
        username,
        firstName,
        lastName,
        email,
        companyName,
        phoneNumber,
        department,
        password,
      ].some((field) => field.trim() === "")
    ) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Please fill all fields",
        },
        {
          status: 400,
        }
      );
    }

    const result = userSchemaValidator.safeParse({ data: userData });

    if (!result.success) {
      const errorMessage =
        result.error?.format().data?.username?._errors[0] ||
        result.error?.format().data?.firstName?._errors[0] ||
        result.error?.format().data?.lastName?._errors[0] ||
        result.error?.format().data?.email?._errors[0] ||
        result.error?.format().data?.phoneNumber?._errors[0] ||
        result.error?.format().data?.department?._errors[0] ||
        result.error?.format().data?.companyName?._errors[0] ||
        result.error?.format().data?.password?._errors[0] ||
        "Sorry internal error occured";

      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: errorMessage,
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const existingUser = await CompanyUserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (
        existingUser.username === username &&
        existingUser.firstName === firstName &&
        existingUser.lastName === lastName &&
        existingUser.email === email &&
        existingUser.companyName === companyName &&
        existingUser.phoneNumber === phoneNumber &&
        existingUser.department === department
      ) {
        return NextResponse.json(
          {
            status: 409,
            success: false,
            message: "Account already eaxist, please login",
          },
          {
            status: 409,
          }
        );
      } else if (existingUser.username === username) {
        return NextResponse.json(
          {
            status: 409,
            success: false,
            message: "Username already exist, please choose another one",
          },
          {
            status: 409,
          }
        );
      } else if (existingUser.email === email) {
        return NextResponse.json(
          {
            status: 409,
            success: false,
            message: "Email already exist, please choose another one",
          },
          {
            status: 409,
          }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: CompanyUserInterface = await CompanyUserModel.create({
      username,
      firstName,
      lastName,
      email,
      companyName,
      phoneNumber,
      department,
      password: hashedPassword,
    });

    if (!newUser) {
      return NextResponse.json(
        {
          status: 500,
          success: false,
          message: "Failed to create new user",
        },
        {
          status: 500,
        }
      );
    }

    await sendMail(
      newUser?.email,
      "Registration Successful",
      "Hello",
      `<p>Hello, <b>${newUser?.firstName}</b></p>
         <p>Thank you for registering! Your account has been successfully created.</p>
         <p>If you have any questions or need assistance, feel free to contact us.</p>
         <p>Best Regards,</p>
         <b>ClientCraft.</b>`
    );

    return NextResponse.json(
      {
        status: 201,
        success: true,
        message: "Registration successful",
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: error?.message || "Sorry internal error!",
      },
      {
        status: 500,
      }
    );
  }
}
