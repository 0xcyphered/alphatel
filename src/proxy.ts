import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    const rest = pathname === "/en" ? "" : pathname.slice(3);
    url.pathname = rest === "" || rest === "/" ? "/" : rest;
    return NextResponse.redirect(url);
  }

  if (pathname === "/fa" || pathname.startsWith("/fa/")) {
    const url = request.nextUrl.clone();
    const rest = pathname === "/fa" ? "" : pathname.slice(3);
    url.pathname = rest === "" || rest === "/" ? "/" : rest;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
