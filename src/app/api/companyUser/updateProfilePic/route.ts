/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWTPayload } from "jose";
import CompanyUserModel from "@/model/CompanyUser.model";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}

export async function PATCH(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("profile-img") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          error: "No file provided",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const token = request.cookies.get("login-user-005")?.value || "";

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    const decodedData = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JWTPayload;

    if (!decodedData) {
      const response = NextResponse.redirect(
        new URL("/login", request.nextUrl)
      );
      response.cookies.delete("login-user-005");
      return response;
    }

    const companyUser = await CompanyUserModel.findById(decodedData.id);

    if (!companyUser) {
      const response = NextResponse.redirect(
        new URL("/login", request.nextUrl)
      );
      response.cookies.delete("login-user-005");
      return response;
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cloudinaryResponse = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "crm-profile-images",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStream.end(buffer);
      }
    );

    if (!companyUser?.profilePic) {
      companyUser.profilePic = cloudinaryResponse.secure_url;
      await companyUser.save();

      return NextResponse.json(
        {
          status: 200,
          message: "Profile picture uploaded successfully",
          data: {
            _id: companyUser._id,
            username: companyUser.username,
            role: companyUser.role,
            email: companyUser.email,
            Clients: companyUser.Clients,
            firstName: companyUser.firstName,
            lastName: companyUser.lastName,
            companyName: companyUser.companyName,
            department: companyUser.department,
            phoneNumber: companyUser.phoneNumber,
            profilePic: companyUser.profilePic,
            isActive: companyUser.isActive,
          },
          success: true,
        },
        {
          status: 200,
        }
      );
    } else {
      if (companyUser?.profilePic) {
        const publicId =
          "crm-profile-images/" +
          companyUser.profilePic.split("/crm-profile-images/")[1].split(".")[0];
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "image",
        });
      }

      companyUser.profilePic = cloudinaryResponse.secure_url;
      await companyUser.save();

      return NextResponse.json(
        {
          status: 200,
          message: "Profile picture updated successfully",
          data: {
            _id: companyUser._id,
            username: companyUser.username,
            role: companyUser.role,
            email: companyUser.email,
            Clients: companyUser.Clients,
            firstName: companyUser.firstName,
            lastName: companyUser.lastName,
            companyName: companyUser.companyName,
            department: companyUser.department,
            phoneNumber: companyUser.phoneNumber,
            profilePic: companyUser.profilePic,
            isActive: companyUser.isActive,
          },
          success: true,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
