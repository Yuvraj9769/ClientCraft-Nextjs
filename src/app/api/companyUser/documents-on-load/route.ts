// /* eslint-disable @typescript-eslint/no-explicit-any */
// import DocumentModel from "@/model/Documents.model";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   try {
//     // const { searchParams } = request.nextUrl;

//     await DocumentModel.aggregate([
//       {
//         $lookup: {
//           from: "users",
//           localField: "authorId",
//           foreignField: "_id",
//           as: "documents",
//         },
//       },
//     ]);

//     const cookiesStore = await cookies();
//     const token = cookiesStore.get("login-user-005");

//     console.log(token?.value);
//   } catch (error: any) {
//     return NextResponse.json({
//       status: 500,
//       message: error.message || "Internal Server Error",
//       success: false,
//     });
//   }
// }
