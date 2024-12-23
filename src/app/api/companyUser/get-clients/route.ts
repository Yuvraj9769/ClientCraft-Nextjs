/* eslint-disable @typescript-eslint/no-explicit-any */

import connectDB from "@/lib/dbConnet";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import CompanyUserModel from "@/model/CompanyUser.model";

export async function GET() {
  try {
    await connectDB();

    const cookiesStore = await cookies();
    const token = cookiesStore.get("login-user-005")?.value;

    if (!token) {
      return NextResponse.json(
        {
          status: 401,
          message: "Unauthorized",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const decodedData = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload;

    const clientsData = await CompanyUserModel.findById(
      decodedData.id
    ).populate("Clients");

    if (!clientsData || clientsData?.Clients?.length === 0) {
      return NextResponse.json(
        {
          status: 404,
          message: "No clients found",
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
        message: "Clients found",
        success: true,
        data: clientsData.Clients,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: false,
        message: error.message || "Sorry something went wrong",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
