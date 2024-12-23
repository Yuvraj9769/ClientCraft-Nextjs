/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnet";
import CompanyUserModel from "@/model/CompanyUser.model";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import CompanyClientModel from "@/model/CompanyClient";

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

    const existingUser = await CompanyClientModel.findOne({
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

    const newClient = await CompanyClientModel.create({
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

    companyUser.Clients?.push(newClient._id as Types.ObjectId);
    await companyUser.save();

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
