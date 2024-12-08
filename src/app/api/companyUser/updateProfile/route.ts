/* eslint-disable @typescript-eslint/no-explicit-any */
import CompanyUserModel from "@/model/CompanyUser.model";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function PATCH(request: NextRequest) {
  try {
    const {
      username,
      companyName,
      department,
      email,
      firstName,
      lastName,
      phoneNumber,
    } = await request.json();

    if (
      [
        username,
        companyName,
        department,
        email,
        firstName,
        lastName,
        phoneNumber,
      ].some((field) => field.trim() === "")
    ) {
      return NextResponse.json(
        {
          status: 400,
          message: "All fields are required",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const token = request.cookies.get("login-user-005")?.value || "";

    const decodedData = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload;

    const existingCompanyUser = await CompanyUserModel.findOne({
      email,
      _id: {
        $ne: decodedData.id,
      },
    });

    if (existingCompanyUser) {
      return NextResponse.json(
        {
          status: 400,
          message: "Email already exists",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const companyUser = await CompanyUserModel.findOneAndUpdate(
      {
        username: {
          $regex: username,
          $options: "i",
        },
      },
      {
        $set: {
          companyName: companyName.trim(),
          department: department.trim(),
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phoneNumber: phoneNumber.trim(),
        },
      },
      {
        new: true,
      }
    );

    if (!companyUser) {
      return NextResponse.json(
        {
          status: 404,
          message: "User not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Profile updated successfully",
        data: companyUser,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message || "Sorry internal error",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
