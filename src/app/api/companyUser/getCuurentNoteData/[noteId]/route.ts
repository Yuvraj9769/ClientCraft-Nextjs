/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import todoModel from "@/model/Todo.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { noteId: string } }
) {
  try {
    const { noteId } = await params;

    if (!noteId || noteId.trim() === "") {
      return NextResponse.json(
        {
          status: 400,
          message: "Note ID required!!",
          success: false,
        },
        { status: 400 }
      );
    }

    await connectDB();

    const currentNoteData = await todoModel
      .findById(noteId)
      .select("_id title description updatedAt");

    if (!currentNoteData) {
      return NextResponse.json(
        {
          status: 404,
          message: "Note not found!!",
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
        message: "Client's data updated successfully!!",
        data: currentNoteData,
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
