/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("login-user-005")?.value || "";
  const path = request.nextUrl.pathname;

  const publicPaths = ["/signup", "/login", "/forgetPasswordSendMail"];
  const companyUserPaths = [
    "/company-dashboard",
    "/company-projects",
    "/create-new-project",
    "/company-clients",
    "/add-new-client",
    "/add-note",
    "/submitFeedBack",
    "/upload-document",
  ];

  // const companyClientPaths = ["/submitFeedBack"];

  const isPublicPath =
    publicPaths.includes(path) || path.startsWith("/forgetPassword/");

  const isCompanyUserPath =
    companyUserPaths.includes(path) ||
    path.startsWith("/update-project/") ||
    path.startsWith("/sendUserCredentials/") ||
    path.startsWith("/delete-companyClient/") ||
    path.startsWith("/update-clientUser/") ||
    path.startsWith("/updateNote/") ||
    path.startsWith("/updateProfile/");

  const isProtectedPath = path === "/";

  if (token) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
    try {
      const { payload } = await jwtVerify(token, secret);
      const role = payload.role;

      // Redirect non-company users trying to access the admin dashboard
      if (isCompanyUserPath && role !== "companyUser") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Redirect authenticated users away from public paths
      if (isPublicPath && !isProtectedPath) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (isCompanyUserPath || (isProtectedPath && !isPublicPath)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Continue processing for allowed paths
  // return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
