/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import projectModel from "@/model/Project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const allProjects = await projectModel.find();

    if (allProjects.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No projects found",
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: allProjects,
        message: "OK",
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Sorry something went wrong",
        status: 500,
      },
      {
        status: 500,
      }
    );
  }
}
