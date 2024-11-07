import connectDB from "@/lib/dbConnet";
import CompanyUserModel from "@/model/CompanyUser.model";
import sendMail from "@/utils/sendMail";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { password, email } = await request.json();

  if ([password, email].some((field) => field.trim() === "")) {
    return NextResponse.json(
      {
        status: 400,
        message: "Please fill all fields",
        success: false,
      },
      {
        status: 400,
      }
    );
  }

  await connectDB();

  const companysUser = await CompanyUserModel.findOne({
    email,
  });

  if (!companysUser) {
    return NextResponse.json(
      {
        status: 400,
        message: "Please register first",
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

  const hashedPassword = await bcrypt.hash(password, 10);
  companysUser.password = hashedPassword;
  companysUser.passwordResetToken = undefined;
  companysUser.passwordResetTokenExpiry = undefined;
  await companysUser.save();

  await sendMail(
    companysUser?.email,
    "Password Updated",
    "Hello ",
    `<p>Hello, <b>${companysUser?.username}</b></p>
    <p>Your password is updated successfully!.</p>
    <p>If you have already updated your password successfully, please ignore this email. If you did not perform this action, please contact us at ClientCraft.</p>
`
  );

  return NextResponse.json(
    {
      status: 200,
      message: "Password updated successfully",
      success: true,
    },
    {
      status: 200,
    }
  );
};
