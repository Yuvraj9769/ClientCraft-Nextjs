/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnet";
import CompanyUserModel from "@/model/CompanyUser.model";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token) {
    return NextResponse.json({
      status: 400,
      message: "Token is required",
      success: false,
    });
  }

  await connectDB();

  const companysUser = await CompanyUserModel.findOne({
    passwordResetToken: token,
  });

  if (!companysUser) {
    return NextResponse.json(
      {
        status: 400,
        message:
          "The password reset link is either invalid or has already been used.",
        success: false,
      },
      {
        status: 400,
      }
    );
  }

  if (companysUser?.passwordResetTokenExpiry !== undefined) {
    if (companysUser.passwordResetTokenExpiry.getTime() <= Date.now()) {
      companysUser.passwordResetToken = undefined;
      companysUser.passwordResetTokenExpiry = undefined;
      await companysUser.save();
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message:
            "The password reset link has expired. Please request a new one.",
        },
        { status: 400 }
      );
    }
  }

  return NextResponse.json(
    {
      status: 200,
      message: "Password reset link is valid",
      success: true,
    },
    {
      status: 200,
    }
  );
}
