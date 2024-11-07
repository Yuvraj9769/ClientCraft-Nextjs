import connectDB from "@/lib/dbConnet";
import CompanyUserModel from "@/model/CompanyUser.model";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import sendMail from "@/utils/sendMail";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || email.trim() === "") {
    return NextResponse.json(
      {
        status: 400,
        message: "Email is required",
        success: false,
      },
      {
        status: 400,
      }
    );
  }

  await connectDB();

  const companyUser = await CompanyUserModel.findOne({
    email,
  });

  if (!companyUser) {
    return NextResponse.json(
      {
        status: 400,
        message: "Email is not registered",
        success: false,
      },
      {
        status: 400,
      }
    );
  }

  if (
    companyUser?.passwordResetToken &&
    companyUser?.passwordResetTokenExpiry
  ) {
    return NextResponse.json(
      {
        status: 400,
        message: "Password reset token already sent",
        success: false,
      },
      {
        status: 400,
      }
    );
  }

  const passwordResetSecureToken = nanoid(64);

  if (!passwordResetSecureToken) {
    return NextResponse.json(
      {
        status: 500,
        message: "Failed to generate password reset token",
        success: false,
      },
      {
        status: 500,
      }
    );
  }

  const url =
    process.env.NODE_ENV === "development"
      ? `${process.env.LOCAL_DOMAIN}/forgetPassword/${passwordResetSecureToken}`
      : `${process.env.LIVE_DOMAIN}/forgetPassword/${passwordResetSecureToken}`;

  await sendMail(
    companyUser?.email,
    "Password Reset Confirmation",
    "Hello ",
    `<p>Hello, <b>${companyUser?.username}</b></p>
    <p>Your password reset request is pending. It will expire in 15 minutes. Please click the button below to proceed:</p>
      <a href="${url}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
       <p>If you did not request this, please ignore this email.</p>`
  );

  companyUser.passwordResetToken = passwordResetSecureToken;
  companyUser.passwordResetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
  await companyUser.save();

  return NextResponse.json(
    {
      status: 200,
      message: "Please check your mail",
      success: true,
    },
    {
      status: 200,
    }
  );
}
