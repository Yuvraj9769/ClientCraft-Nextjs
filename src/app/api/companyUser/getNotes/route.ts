/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import CompanyUserModel from "@/model/CompanyUser.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

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

    const todos = await CompanyUserModel.findById(decodedData.id).populate(
      "todos"
    );

    if (!todos || todos?.todos?.length === 0) {
      return NextResponse.json(
        {
          status: 404,
          message: "No todos found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Todos found",
        data: todos.todos,
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
      { status: 500 }
    );
  }
}
