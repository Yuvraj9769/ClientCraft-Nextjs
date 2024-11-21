/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import companyClientModel from "@/model/CompanyClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { searchQuery } = await request.json();

    if (!searchQuery || searchQuery.trim() === "") {
      return NextResponse.json(
        {
          status: 400,
          message: "Please enter a search query",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const searchedClients = await companyClientModel
      .find({
        $or: [
          {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          },
          {
            email: {
              $regex: searchQuery,
              $options: "i",
            },
          },
        ],
      })
      .select("-__v");

    if (searchedClients.length === 0 || !searchedClients) {
      return NextResponse.json(
        {
          status: 404,
          message: "No clients found",
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
        message: "Clinets found",
        data: searchedClients,
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
