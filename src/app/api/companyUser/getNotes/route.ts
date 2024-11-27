/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import todoModel from "@/model/Todo.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const todos = await todoModel.find();

    if (todos.length === 0) {
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
        data: todos,
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
