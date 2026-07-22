import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Beveiligt /admin en /api/admin/* met één wachtwoord-cookie.
// /admin/login blijft toegankelijk zodat je kan inloggen.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const expected = createHash("sha256")
    .update(process.env.ADMIN_PASSWORD ?? "")
    .digest("hex");
  const session = request.cookies.get("admin_session")?.value;

  if (session === expected) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
