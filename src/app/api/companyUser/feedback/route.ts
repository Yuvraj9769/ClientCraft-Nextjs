/* eslint-disable @typescript-eslint/no-explicit-any */

import FeedBackModel from "@/model/Feedback";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { data, userId, email } = await request.json();

    if (!data || data.trim() === "") {
      return NextResponse.json(
        {
          status: 400,
          message: "Invalid request",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const feedBack = await FeedBackModel.create({
      senderUserId: userId,
      senderUserEmail: email,
      content: data,
    });

    if (!feedBack) {
      return NextResponse.json(
        {
          status: 500,
          message: "Failed to create feedback",
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Feedback created successfully",
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
