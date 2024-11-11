/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import CompanyUserModel from "@/model/CompanyUser.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("login-user-005")?.value || "";

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  let decodedData: JwtPayload | string;

  try {
    decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    if ((decodedData as JwtPayload).id) {
      await connectDB();

      const companyUser = await CompanyUserModel.findById(
        (decodedData as JwtPayload).id
      ).select("-password -passwordResetToken -passwordResetTokenExpiry");

      if (!companyUser) {
        const response = NextResponse.redirect(
          new URL("/login", request.nextUrl)
        );
        response.cookies.delete("login-user-005");
        return response;
      }

      return NextResponse.json(
        {
          status: 200,
          data: companyUser,
          message: "OK",
          success: true,
        },
        {
          status: 200,
        }
      );
    } else {
      const response = NextResponse.redirect(
        new URL("/login", request.nextUrl)
      );
      response.cookies.delete("login-user-005");
      return response;
    }
  } catch (error) {
    console.error("Error verifying token:", error);

    const response = NextResponse.redirect(new URL("/login", request.nextUrl));
    response.cookies.delete("login-user-005");
    return response;
  }
}
