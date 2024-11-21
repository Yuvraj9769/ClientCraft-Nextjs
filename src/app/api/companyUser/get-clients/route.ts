/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import companyClientModel from "@/model/CompanyClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const allClients = await companyClientModel.find();

    if (allClients.length === 0 || !allClients) {
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
        data: allClients,
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
