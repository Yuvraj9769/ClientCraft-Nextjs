/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import CompanyUserModel from "@/model/CompanyUser.model";
import { Types } from "mongoose";
import ProjectModel from "@/model/Project";

export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ delId: string }> }
) {
  try {
    const { delId } = await context.params;

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

    const deletedProject = await ProjectModel.findByIdAndDelete(delId);

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

    companyUser.projects = companyUser.projects.filter(
      (projIds) => !projIds.equals(new Types.ObjectId(delId))
    );
    await companyUser.save();

    const otherProjects = await ProjectModel.find();

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
