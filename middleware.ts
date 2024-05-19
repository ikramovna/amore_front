import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/auth/sign-in", "/auth/sign-up"];
const adminRoutes = [
  "/admin",
  "/admin/booking",
  "/admin/restaurant",
  "/admin/add-restaurant",
  "/admin/edit-restaurant",
];
const userRoutes = ["/user-profile", "/user-profile/booking"];

export async function middleware(request: NextRequest) {
  const currentUser = await request.cookies.get("currentUser")?.value;
  const role = await request.cookies.get("role")?.value;

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (adminRoutes.includes(request.nextUrl.pathname) && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (userRoutes.includes(request.nextUrl.pathname) && role !== "user") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
