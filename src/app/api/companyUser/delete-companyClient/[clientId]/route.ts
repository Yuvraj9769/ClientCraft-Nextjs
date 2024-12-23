/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import CompanyUserModel from "@/model/CompanyUser.model";
import { Types } from "mongoose";
import CompanyClientModel from "@/model/CompanyClient";

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

    const deletedProject = await CompanyClientModel.findByIdAndDelete(clientId);

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

    const companyUser = await CompanyUserModel.findById(decodedData.id);

    if (!companyUser) {
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

    companyUser.Clients = companyUser?.Clients?.filter(
      (clientIds) => !clientIds.equals(new Types.ObjectId(clientId))
    );
    await companyUser.save();

    const otherClients = await CompanyClientModel.find();

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
