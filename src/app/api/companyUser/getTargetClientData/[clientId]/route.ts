/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import CompanyClientModel from "@/model/CompanyClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ clientId: string }> }
) {
  try {
    const { clientId } = await context.params;

    if (!clientId) {
      return NextResponse.json(
        {
          status: 400,
          message: "Client Id is required",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const clientData = await CompanyClientModel.findById(clientId).select(
      "_id name email"
    );

    if (!clientData) {
      return NextResponse.json(
        {
          status: 404,
          message: "Client not found",
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
        message: "Client data fetched successfully",
        success: true,
        data: clientData,
      },
      {
        status: 200,
      }
    );
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
