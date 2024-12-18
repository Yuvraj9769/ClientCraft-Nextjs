/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import companyClientModel from "@/model/CompanyClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ clientId: string }> }
) {
  try {
    const { clientId } = await context.params;

    if (!clientId || clientId.trim() === "") {
      return NextResponse.json(
        {
          status: 400,
          message: "Client's ID required!!",
          success: false,
        },
        { status: 400 }
      );
    }

    await connectDB();

    const companyClientData = await companyClientModel
      .findById(clientId)
      .select("_id name email dateJoined country phone");

    if (!companyClientData) {
      return NextResponse.json(
        {
          status: 404,
          message: "Client not found!!",
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
        message: "Client's data updated successfully!!",
        data: companyClientData,
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
