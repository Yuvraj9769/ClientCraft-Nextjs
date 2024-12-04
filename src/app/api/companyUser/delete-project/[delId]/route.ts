/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import projectModel from "@/model/Project";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { delId: string } }
) {
  try {
    const { delId } = await params;

    if (!delId || delId.trim() === "") {
      return NextResponse.json(
        {
          status: 400,
          message: "Project's ID required!!",
          success: false,
        },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedProject = await projectModel.findByIdAndDelete(delId);

    if (!deletedProject) {
      return NextResponse.json(
        {
          status: 404,
          message: "Project not found!!",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const otherProjects = await projectModel.find();

    if (!otherProjects) {
      return NextResponse.json(
        {
          status: 404,
          message: "No projects found!!",
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
        message: "Project deleted successfully!!",
        data: otherProjects,
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
