/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import CompanyUserModel from "@/model/CompanyUser.model";
import { Types } from "mongoose";
import TodoModel from "@/model/Todo.model";

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

    const existingTodo = await TodoModel.find({
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

    const newTodo = new TodoModel({
      title,
      description,
    });

    await newTodo.save();

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

    companyUser.todos.push(newTodo._id as Types.ObjectId);
    await companyUser.save();

    const allTodos = await TodoModel.find();

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
