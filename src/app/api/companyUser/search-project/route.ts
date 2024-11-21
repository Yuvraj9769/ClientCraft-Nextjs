/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import projectModel from "@/model/Project";
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

    const searchedProject = await projectModel
      .find({
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
      })
      .select("-__v");

    if (searchedProject.length === 0 || !searchedProject) {
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
        data: searchedProject,
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
