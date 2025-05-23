/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import CompanyUserModel from "@/model/CompanyUser.model";
import { Types } from "mongoose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import ProjectModel from "@/model/Project";
import CompanyClientModel from "@/model/CompanyClient";

export async function POST(request: NextRequest) {
  try {
    const { _id, email, name, projectName, projectStatus, projectBudget } =
      await request.json();

    if (
      [_id, email, name, projectName, projectStatus, projectBudget].some(
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

    const existingClient = await CompanyClientModel.findById(_id);

    if (!existingClient) {
      return NextResponse.json(
        {
          status: 404,
          message: "Please add client first",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const existingProject = await ProjectModel.find({
      projectName,
      clientName: name,
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

    const newProject = await ProjectModel.create({
      projectName,
      clientName: name,
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

    existingClient.Projects?.push(newProject._id as Types.ObjectId);
    await existingClient.save();

    companyUser.projects?.push(newProject._id as Types.ObjectId);
    await companyUser.save();

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
