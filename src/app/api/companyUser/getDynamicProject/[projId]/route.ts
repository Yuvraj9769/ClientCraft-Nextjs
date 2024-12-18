/* eslint-disable @typescript-eslint/no-explicit-any */

import connectDB from "@/lib/dbConnet";
import projectModel from "@/model/Project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ projId: string }> }
) {
  try {
    const { projId } = await context.params;

    if (!projId || projId.trim() === "") {
      return NextResponse.json(
        {
          status: 400,
          message: "Invalid project id",
          success: false,
        },
        { status: 400 }
      );
    }

    await connectDB();

    const project = await projectModel.findById(projId);

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
        message: "Project found",
        data: project,
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
