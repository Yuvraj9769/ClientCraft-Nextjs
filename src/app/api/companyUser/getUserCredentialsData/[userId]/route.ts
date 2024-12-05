/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import companyClientModel from "@/model/CompanyClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await params;

    if (!userId || userId.trim() === "") {
      return NextResponse.json(
        {
          status: 400,
          message: "User ID is required",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const companyClientUser = await companyClientModel
      .findById(userId)
      .select("name email password");

    if (!companyClientUser) {
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
        message: "User found",
        data: companyClientUser,
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
        message: error.message || "Sorry internal error occured",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
