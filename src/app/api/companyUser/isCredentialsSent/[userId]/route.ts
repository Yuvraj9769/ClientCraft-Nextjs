/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import companyClientModel from "@/model/CompanyClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;

    if (!userId) {
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

    const companyClientUser = await companyClientModel.findById(userId);

    if (!companyClientUser) {
      return NextResponse.json(
        {
          status: 400,
          message: "Client not found",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    if (companyClientUser.isCredentialsSend) {
      return NextResponse.json(
        {
          status: 400,
          message: "Credentials already sent",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Ok",
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
