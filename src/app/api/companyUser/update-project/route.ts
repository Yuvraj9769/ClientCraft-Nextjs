/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import ProjectModel from "@/model/Project";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const { _id, clientName, projectName, status, budget } =
      await request.json();

    if (
      [_id, clientName, projectName, status, budget].some(
        (field) => field.trim() === ""
      )
    ) {
      return NextResponse.json(
        {
          status: 400,
          message: "Please fill in all fields",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const project = await ProjectModel.findByIdAndUpdate(
      _id,
      {
        clientName,
        projectName,
        status,
        budget,
      },
      {
        new: true,
      }
    );

    if (!project) {
      return NextResponse.json(
        {
          status: 404,
          message: "Project not found",
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
        message: "Project updated successfully",
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
