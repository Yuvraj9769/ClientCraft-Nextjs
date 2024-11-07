import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("login-user-005")?.value || "";

  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/signup" ||
    path === "/login" ||
    path === "/forgetPasswordSendMail" ||
    path.startsWith("/forgetPassword/");

  const protectedPath = path === "/";

  if (isPublicPath && token && !protectedPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token && protectedPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/forgetPasswordSendMail",
    "/forgetPassword/:passwordResetToken*",
  ],
};
