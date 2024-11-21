/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnet";
import companyClientModel from "@/model/CompanyClient";

export async function POST(request: NextRequest) {
  try {
    const {
      clientName,
      clientEmail,
      clientJoinDate,
      clientCountry,
      clientPhone,
    } = await request.json();

    if (
      [
        clientName,
        clientEmail,
        clientJoinDate,
        clientCountry,
        clientPhone,
      ].some((field) => field.trim() === "")
    ) {
      return NextResponse.json(
        {
          status: 400,
          message: "Please fill all fields",
          success: false,
        },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await companyClientModel.findOne({
      $or: [
        {
          name: {
            $regex: `^${clientName}$`,
            $options: "i",
          },
        },
        {
          email: {
            $regex: `^${clientEmail}$`,
            $options: "i",
          },
        },
      ],
    });

    if (existingUser) {
      if (
        existingUser.name === clientName &&
        existingUser.email === clientEmail
      ) {
        return NextResponse.json(
          {
            status: 400,
            message: "Client already exist",
            success: false,
          },
          {
            status: 400,
          }
        );
      } else if (existingUser.name === clientName) {
        return NextResponse.json(
          {
            status: 409,
            message: "Client already exist with same name",
            success: false,
          },
          {
            status: 409,
          }
        );
      } else if (existingUser.email === clientEmail) {
        return NextResponse.json(
          {
            status: 409,
            message: "Client already exist with same email",
            success: false,
          },
          {
            status: 409,
          }
        );
      }
    }

    const newClient = await companyClientModel.create({
      name: clientName,
      email: clientEmail,
      dateJoined: clientJoinDate,
      country: clientCountry,
      phone: clientPhone,
    });

    if (!newClient) {
      return NextResponse.json(
        {
          status: 500,
          message: "Failed to create client",
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        status: 201,
        message: "Client added successfully",
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
        message: error.message || "Something went wrong",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
