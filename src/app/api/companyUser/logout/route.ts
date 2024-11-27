/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("login-user-005")?.value || "";

    if (token.trim() === "" || !token) {
      return NextResponse.json(
        {
          status: 404,
          message: "Please login first",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    if (!decodedToken) {
      return NextResponse.json(
        {
          status: 404,
          message: "Unauthorized",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const response = NextResponse.json(
      {
        status: 200,
        message: "Logout successful",
        success: true,
      },
      {
        status: 200,
      }
    );

    response.cookies.delete("login-user-005");

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message || "Internal Server Error",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
