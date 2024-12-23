/* eslint-disable @typescript-eslint/no-explicit-any */

import connectDB from "@/lib/dbConnet";
import TodoModel from "@/model/Todo.model";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const { _id, title, description, updatedAt } = await request.json();

    if (
      [_id, title, description, updatedAt].some((field) => field.trim() === "")
    ) {
      return NextResponse.json(
        {
          status: 400,
          message: "Please fill in all fields",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      _id,
      {
        $set: {
          title: title.trim(),
          description: description.trim(),
        },
      },
      {
        new: true,
      }
    );

    if (!updatedTodo) {
      return NextResponse.json(
        {
          status: 404,
          message: "Note not found",
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
        message: "Note updated successfully",
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
