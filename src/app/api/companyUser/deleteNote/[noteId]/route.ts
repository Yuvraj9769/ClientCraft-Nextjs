/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import todoModel from "@/model/Todo.model";
import { NextRequest, NextResponse } from "next/server";

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

    const deletedNote = await todoModel.findByIdAndDelete(noteId);

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

    const otherNotes = await todoModel.find();

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
