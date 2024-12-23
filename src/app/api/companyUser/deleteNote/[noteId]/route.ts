/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import CompanyUserModel from "@/model/CompanyUser.model";
import { Types } from "mongoose";
import TodoModel from "@/model/Todo.model";

export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ noteId: string }> }
) {
  try {
    const { noteId } = await context.params;

    if (!noteId || noteId.trim() === "") {
      return NextResponse.json(
        {
          sattus: 400,
          message: "Note ID is required",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const deletedNote = await TodoModel.findByIdAndDelete(noteId);

    if (!deletedNote) {
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

    companyUser.todos = companyUser.todos.filter(
      (todoIds) => !todoIds.equals(new Types.ObjectId(noteId))
    );
    await companyUser.save();

    const otherNotes = await TodoModel.find();

    if (otherNotes.length === 0) {
      return NextResponse.json(
        {
          status: 404,
          message: "No notes found",
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
        message: "Note deleted successfully",
        data: otherNotes,
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
