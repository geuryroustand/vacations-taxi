import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request = NextRequest) {
  // NextResponse.redirect(new URL("/home", request.url));

  const searchParameters = new URLSearchParams(request.nextUrl.search);

  if (request.nextUrl.pathname.startsWith("/booking-details")) {
    const pickUp = searchParameters.get("pickUp");
    const dropOff = searchParameters.get("dropOff");
    const checkMongoIDRegExp = /^[\dA-Fa-f]{24}$/;

    if (!checkMongoIDRegExp.test(pickUp && dropOff))
      return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/payment-details")) {
    const pickUp = searchParameters.get("pickUp");
    const dropOff = searchParameters.get("dropOff");
    const checkMongoIDRegExp = /^[\dA-Fa-f]{24}$/;

    if (!checkMongoIDRegExp.test(pickUp && dropOff))
      return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/booking-details/:path*", "/payment-details/:path*"]
};
