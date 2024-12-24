/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import CompanyUserModel from "@/model/CompanyUser.model";
import "@/model/Project";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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

    const searchedProject = await CompanyUserModel.findById(
      decodedData.id
    ).populate({
      path: "projects",
      match: {
        $or: [
          {
            clientName: {
              $regex: searchQuery,
              $options: "i",
            },
          },
          {
            projectName: {
              $regex: searchQuery,
              $options: "i",
            },
          },
        ],
      },
    });

    if (!searchedProject || searchedProject.projects.length === 0) {
      return NextResponse.json(
        {
          status: 404,
          message: "No project found",
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
        message: "Project found",
        data: searchedProject.projects,
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
