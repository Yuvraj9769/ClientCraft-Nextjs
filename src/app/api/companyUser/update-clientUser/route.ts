/* eslint-disable @typescript-eslint/no-explicit-any */

import connectDB from "@/lib/dbConnet";
import CompanyClientModel from "@/model/CompanyClient";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const { _id, name, email, dateJoined, country, phone } =
      await request.json();

    if (
      [_id, name, email, dateJoined, country, phone].some(
        (field) => field.trim() === ""
      )
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

    const existingClientWithEmail = await CompanyClientModel.findOne({
      email,
      _id: {
        $ne: _id,
      },
    });

    if (existingClientWithEmail) {
      return NextResponse.json(
        {
          status: 400,
          message: "Email already exists",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const client = await CompanyClientModel.findByIdAndUpdate(
      _id,
      {
        $set: {
          name: name.trim(),
          email: email.trim(),
          dateJoined,
          country: country.trim(),
          phone: phone.trim(),
        },
      },
      {
        new: true,
      }
    );

    if (!client) {
      return NextResponse.json(
        {
          status: 404,
          message: "Client not found",
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
        message: "Client's data updated successfully",
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
