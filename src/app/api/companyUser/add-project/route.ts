/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import projectModel from "@/model/Project";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { projectName, projectClientName, projectStatus, projectBudget } =
      await request.json();

    if (
      [projectName, projectClientName, projectStatus, projectBudget].some(
        (field) => field.trim() === ""
      )
    ) {
      return NextResponse.json(
        {
          status: 400,
          message: "Please fill all fields",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const existingProject = await projectModel.find({
      projectName,
      clientName: projectClientName,
      status: projectStatus,
      budget: projectBudget,
    });

    if (existingProject.length !== 0) {
      return NextResponse.json(
        {
          status: 409,
          message: "Project already exists",
          success: false,
        },
        {
          status: 409,
        }
      );
    }

    const newProject = await projectModel.create({
      projectName,
      clientName: projectClientName,
      status: projectStatus,
      budget: projectBudget,
    });

    if (!newProject) {
      return NextResponse.json(
        {
          status: 500,
          message: "Failed to create project",
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        status: 201,
        message: "Project created successfully",
        success: true,
      },
      {
        status: 201,
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
