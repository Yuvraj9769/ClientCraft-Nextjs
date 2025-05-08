import connectDB from "@/lib/dbConnet";
import CompanyClientModel from "@/model/CompanyClient";
import sendProjectMailToClient from "@/utils/sendProjectMailToClient";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const {
      _id,
      clientName,
      projectName,
      status,
      budget,
      description,
      deadline,
    } = await request.json();

    if (
      [
        _id,
        clientName,
        projectName,
        status,
        budget,
        description,
        deadline,
      ].some(
        (field) => field === "" || field === undefined || field.trim() === ""
      )
    ) {
      return NextResponse.json(
        {
          status: 400,
          message: "All fields are required",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const client = await CompanyClientModel.findOne({
      name: {
        $regex: new RegExp(`^${clientName}$`, "i"),
      },
    });

    if (!client) {
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

    await sendProjectMailToClient({
      clientEmail: client.email,
      clientName,
      projectName,
      status,
      budget,
      description,
      deadline,
    });

    return NextResponse.json(
      {
        status: 200,
        message: "Project details sent successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      {
        status: 500,
        message: "Internal Server Error",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
};
