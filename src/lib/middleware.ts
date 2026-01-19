import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  const { pathname } = new URL(req.url);

  // Public dashboard routes
  if (
    pathname.startsWith("/dashboard/login") ||
    pathname.startsWith("/dashboard/reset-password") ||
    pathname.startsWith("/dashboard/reset-password-mail")
  ) {
    return NextResponse.next();
  }

  // Private dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // Try refresh → if fails, redirect to login
    const refresh = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { cookie: req.headers.get("cookie") ?? "" }
    });
    if (!refresh.ok) {
      return NextResponse.redirect(new URL("/dashboard/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};
