/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWTPayload } from "jose";
import CompanyUserModel from "@/model/CompanyUser.model";
import DocumentModel from "@/model/Documents.model";
import connectDB from "@/lib/dbConnet";
import { Types } from "mongoose";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("document") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded", success: false },
        { status: 400 }
      );
    }

    const token = request.cookies.get("login-user-005")?.value || "";

    if (!token || token.trim() === "") {
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

    await connectDB();

    const companyUser = await CompanyUserModel.findById(decodedData.id);

    if (!companyUser) {
      return NextResponse.json(
        {
          status: 404,
          message: "User not found!!",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    //IMP: - Here if added new bucket we require to set new policies (ALL) then it will be accessible.

    // Upload file to Supabase Storage
    const { error } = await supabase.storage
      .from("crm-documents") // Use your bucket name
      .upload(`documents/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Get public download URL
    const { data: publicUrl } = supabase.storage
      .from("crm-documents")
      .getPublicUrl(`documents/${file.name}`);

    const document = await DocumentModel.create({
      companyUserId: companyUser._id,
      title: file.name,
      documentLink: publicUrl.publicUrl,
    });

    if (!document) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Document not uploaded successfully",
        },
        {
          status: 400,
        }
      );
    }

    companyUser.documents.push(document._id as Types.ObjectId);
    await companyUser.save();

    const sendDocuments = await CompanyUserModel.findById(companyUser._id)
      .populate({
        path: "documents",
        select: "_id title documentLink createdAt",
      })
      .select("_id username documents");

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: "File uploaded successfully",
        data: sendDocuments || [],
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
