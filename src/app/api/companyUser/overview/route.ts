/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import connectDB from "@/lib/dbConnet";
import projectModel from "@/model/Project";
import companyClientModel from "@/model/CompanyClient";
import CompanyUserModel from "@/model/CompanyUser.model";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("login-user-005")?.value || "";

    const decodedData = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload;

    const { id } = decodedData;

    await connectDB();

    const comapnyCurrentUserData = await CompanyUserModel.findById(id);

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

    console.log(comapnyCurrentUserData);

    const projectsData = await projectModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }, //  // Count the documents in each group
        },
      },
    ]);

    const clientsCount = await companyClientModel.countDocuments();

    const activeClientsCount = await companyClientModel.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $count: "totalActiveClients", // count all active clients and give output name as totalActiveClients
      },
    ]);

    const currentCompanyAllUsers = await CompanyUserModel.aggregate([
      {
        $match: {
          companyName: comapnyCurrentUserData.companyName,
        },
      },
      {
        $count: "totalCompanyUsers",
      },
    ]);

    const overViewData = [
      { clientsCount: clientsCount || 0 },
      activeClientsCount.length !== 0
        ? activeClientsCount?.[0].totalActiveClients
        : 0,
      currentCompanyAllUsers.length !== 0
        ? currentCompanyAllUsers?.[0].totalCompanyUsers
        : 0,
    ];

    const modifiedProjectsData = [];

    modifiedProjectsData.push(
      projectsData.length !== 0
        ? projectsData?.[0]
        : { _id: "Pending", count: 0 }
    );
    modifiedProjectsData.push(
      projectsData.length !== 0
        ? projectsData?.[1]
        : { _id: "Active", count: 0 }
    );
    modifiedProjectsData.push(
      projectsData.length !== 0
        ? projectsData?.[2]
        : { _id: "Completed", count: 0 }
    );

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
