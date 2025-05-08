/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import connectDB from "@/lib/dbConnet";
import CompanyUserModel from "@/model/CompanyUser.model";
import "@/model/CompanyClient";
import "@/model/Project";
import "@/model/Todo.model";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("login-user-005")?.value || "";

    const decodedData = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload;

    const { id } = decodedData;

    await connectDB();

    const comapnyCurrentUserData = await CompanyUserModel.findById(id)
      .populate("Clients")
      .populate("todos")
      .populate("projects");

    if (!comapnyCurrentUserData) {
      return NextResponse.json(
        {
          status: 404,
          message: "User not found",
          data: 0,
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const totalCompanyUsers = await CompanyUserModel.aggregate([
      {
        $match: {
          companyName: comapnyCurrentUserData.companyName,
        },
      },
      {
        $count: "totalCompanyUsers",
      },
    ]);

    const overViewData = [];

    const clientsCount = comapnyCurrentUserData.Clients.length || 0;

    overViewData.push(
      { clientsCount },
      { documentsCount: comapnyCurrentUserData.documents.length || 0 },
      { totalCompanyUsers: totalCompanyUsers[0].totalCompanyUsers }
    );

    const modifiedProjectsData = [
      { _id: "Pending", count: 0 },
      { _id: "Active", count: 0 },
      { _id: "Completed", count: 0 },
    ];

    comapnyCurrentUserData.projects.forEach((project: any) => {
      if (project.status === "Pending") modifiedProjectsData[0].count++;
      if (project.status === "Active") modifiedProjectsData[1].count++;
      if (project.status === "Completed") modifiedProjectsData[2].count++;
    });

    overViewData.push(modifiedProjectsData);

    return NextResponse.json(
      {
        status: 200,
        message: "Ok",
        data: overViewData,
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
