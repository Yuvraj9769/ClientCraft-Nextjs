import connectDB from "@/lib/dbConnet";
import CompanyUserModel from "@/model/CompanyUser.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const { identifier, password } = await request.json();

  if ([identifier, password].some((field) => field.trim() === "")) {
    return NextResponse.json(
      {
        status: 400,
        message: "Please fill in all fields",
        success: false,
      },
      {
        status: 400,
      }
    );
  }

  await connectDB();

  const companyUser = await CompanyUserModel.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!companyUser) {
    return NextResponse.json(
      {
        status: 401,
        message: "Please signup first",
        success: false,
      },
      {
        status: 401,
      }
    );
  }

  const isMatch: boolean = await bcrypt.compare(password, companyUser.password);

  if (!isMatch) {
    return NextResponse.json(
      {
        status: 401,
        message: "Invalid password",
        success: false,
      },
      {
        status: 401,
      }
    );
  }

  const token = await companyUser.generateJWTTOken();

  if (!token) {
    return NextResponse.json(
      {
        status: 500,
        message: "Failed to generate token",
        success: false,
      },
      {
        status: 500,
      }
    );
  }

  type cookieOptionsType = {
    httpOnly: boolean;
    secure: boolean;
    expires: Date;
  };

  const cookieOptions: cookieOptionsType = {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  };

  companyUser.isActive = true;
  await companyUser.save();

  const response = NextResponse.json(
    {
      status: 200,
      data: {
        _id: companyUser._id,
        username: companyUser.username,
        role: companyUser.role,
        email: companyUser.email,
        Clients: companyUser.Clients,
        firstName: companyUser.firstName,
        lastName: companyUser.lastName,
        companyName: companyUser.companyName,
        department: companyUser.department,
        phoneNumber: companyUser.phoneNumber,
        isActive: companyUser.isActive,
      },
      message: "Login successful",
      success: true,
    },
    {
      status: 200,
    }
  );

  response.cookies.set("login-user-005", token, cookieOptions);

  return response;
}
