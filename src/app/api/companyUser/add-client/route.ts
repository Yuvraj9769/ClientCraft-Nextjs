/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnet";
import companyClientModel from "@/model/CompanyClient";
import projectModel from "@/model/Project";
import { Types } from "mongoose";

export async function POST(request: NextRequest) {
  try {
    const { clientName, projectName, projectStatus } = await request.json();

    console.log(clientName, projectName, projectStatus);

    if (
      [clientName, projectName, projectStatus].some(
        (field) => field.trim() === ""
      )
    ) {
      return NextResponse.json(
        {
          status: 400,
          message: "Please fill all fields",
          success: false,
        },
        { status: 400 }
      );
    }

    await connectDB();

    const existingProject = await projectModel.findOne({
      $and: [
        {
          clientName: {
            $regex: `^${clientName}$`,
            $options: "i",
          },
        },
        {
          projectName: {
            $regex: `^${projectName}$`,
            $options: "i",
          },
        },
      ],
    });

    if (existingProject) {
      return NextResponse.json(
        {
          status: 400,
          message: "Project already exist",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const newProject = await projectModel.create({
      clientName: clientName,
      projectName: projectName,
      status: projectStatus,
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

    const isUserExist = await companyClientModel.findOne({
      name: { $regex: `^${clientName}$`, $options: "i" },
    });

    if (isUserExist) {
      isUserExist.Projects.push(newProject._id as Types.ObjectId);
      await isUserExist.save();

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
    }

    if (!isUserExist) {
      const newClient = await companyClientModel.create({
        name: clientName,
      });

      if (!newClient) {
        return NextResponse.json(
          {
            status: 500,
            message: "Failed to add client",
            success: false,
          },
          {
            status: 500,
          }
        );
      }

      newClient.Projects.push(newProject._id as Types.ObjectId);
      await newClient.save();

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
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message || "Something went wrong",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
