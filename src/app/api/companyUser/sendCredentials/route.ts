/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnet";
import "@/model/CompanyClient";
import sendMail from "@/utils/sendMail";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import CompanyUserModel from "@/model/CompanyUser.model";
import CompanyClientModel from "@/model/CompanyClient";

export async function POST(request: NextRequest) {
  try {
    const { clientName, clientEmail, password } = await request.json();

    if (
      [clientName, clientEmail, password].some((field) => field.trim() === "")
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

    const companyClientFromPopulate = await CompanyUserModel.findById(
      decodedData.id
    ).populate({
      path: "Clients",
      match: {
        $or: [
          {
            name: clientName,
          },
          {
            email: clientEmail,
          },
        ],
      },
      select: "name email isCredentialsSend",
    });

    if (
      !companyClientFromPopulate ||
      companyClientFromPopulate?.Clients.length === 0
    ) {
      return NextResponse.json(
        {
          status: 400,
          message: "Client not found",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const companyClientUser = await CompanyClientModel.findById(
      companyClientFromPopulate.Clients[0]._id
    );

    if (!companyClientUser) {
      return NextResponse.json(
        {
          status: 400,
          message: "Client not found",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    if (companyClientUser.isCredentialsSend) {
      return NextResponse.json(
        {
          status: 400,
          message: "Credentials already sent",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    companyClientUser.isCredentialsSend = true;
    companyClientUser.password = await bcrypt.hash(password, 10);
    await companyClientUser.save();

    const clientUrl = "/client/login";

    await sendMail(
      companyClientUser?.email,
      "Account Access Details",
      "Hello",
      `<p>Hello, <b>${companyClientUser?.name}</b>,</p>
       <p>🚀 You can now access your account using the credentials provided below:</p>
       <ul>
         <li style="margin: 8px 0px;" ><b>🔗 Login URL: </b> <a href=${clientUrl}>Login</a></li>
         <li style="margin: 8px 0px;" ><b>📧 Email:</b> ${companyClientUser?.email}</li>
         <li style="margin: 8px 0px;" ><b>🔑 Temporary Password:</b> ${password}</li>
       </ul>
       <p><b>Important:</b> 🔒 Please log in and update your password immediately to ensure the security of your account.</p>
       <p>If you have any questions or need assistance, feel free to contact us. 😊</p>
       <p>Best Regards,</p>
       <b>ClientCraft.</b>`
    );

    return NextResponse.json(
      {
        status: 200,
        message: "Credentials sent successfully",
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
        message: error.message || "Sorry internal error occured",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
