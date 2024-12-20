/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import companyClientModel from "@/model/CompanyClient";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ clientId: string }> }
) {
  try {
    const { clientId } = await context.params;

    if (!clientId || clientId.trim() === "") {
      return NextResponse.json(
        {
          status: 400,
          message: "Client's ID is required",
          success: false,
        },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedProject = await companyClientModel.findByIdAndDelete(clientId);

    if (!deletedProject) {
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

    const otherClients = await companyClientModel.find();

    if (otherClients.length === 0) {
      return NextResponse.json(
        {
          status: 404,
          message: "No clients found!!",
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
        data: otherClients,
        message: "Client deleted successfully!!",
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
