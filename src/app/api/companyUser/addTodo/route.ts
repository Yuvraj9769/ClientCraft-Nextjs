/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import todoModel from "@/model/Todo.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json();

    if ([title, description].some((field) => field.trim() === "")) {
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

    const existingTodo = await todoModel.find({
      title: {
        $regex: `^${title}$`,
        $options: "i",
      },
      description: {
        $regex: `^${description}$`,
        $options: "i",
      },
    });

    if (existingTodo.length !== 0) {
      return NextResponse.json(
        {
          status: 400,
          message: "Todo already exists",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const newTodo = new todoModel({
      title,
      description,
    });

    await newTodo.save();

    const allTodos = await todoModel.find();

    if (allTodos.length === 0) {
      return NextResponse.json(
        {
          status: 404,
          message: "No todos found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        status: 201,
        message: "Todo created successfully",
        data: allTodos,
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
        message: error.message || "Sorry internal error occured",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
