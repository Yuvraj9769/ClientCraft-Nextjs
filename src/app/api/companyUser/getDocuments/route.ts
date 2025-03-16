/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import { JWTPayload } from "jose";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import CompanyUserModel from "@/model/CompanyUser.model";
import "@/model/Documents.model";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("login-user-005")?.value || "";

    if (!token || token.trim() === "") {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    const decodedData = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JWTPayload;

    if (!decodedData) {
      const response = NextResponse.redirect(
        new URL("/login", request.nextUrl)
      );
      response.cookies.delete("login-user-005");
      return response;
    }

    await connectDB();

    const sendDocuments = await CompanyUserModel.findById(decodedData.id)
      .populate({
        path: "documents",
        select: "_id title documentLink createdAt",
      })
      .select("_id username documents");

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: "Documents fetched successfully",
        data: sendDocuments || [],
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
}
