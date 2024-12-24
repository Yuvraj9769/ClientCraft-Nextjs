/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import "@/model/CompanyClient";
import CompanyUserModel from "@/model/CompanyUser.model";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { searchQuery } = await request.json();

    if (!searchQuery || searchQuery.trim() === "") {
      return NextResponse.json(
        {
          status: 400,
          message: "Please enter a search query",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

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

    const searchedClients = await CompanyUserModel.findById(
      decodedData.id
    ).populate({
      path: "Clients",
      match: {
        $or: [
          {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          },
          {
            email: {
              $regex: searchQuery,
              $options: "i",
            },
          },
        ],
      },
    });

    if (!searchedClients || searchedClients.Clients.length === 0) {
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
        message: "Clinets found",
        data: searchedClients.Clients,
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
        message: error.message || "Internal Server Error",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
