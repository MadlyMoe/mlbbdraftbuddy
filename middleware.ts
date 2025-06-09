import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Auth not connected to Db (db was giving error)
const { auth } = NextAuth(authConfig);

// List of protected routes
const protectedRoutes = ["/your-protected-route", "/draft"];

export default auth((req) => {
  const { nextUrl } = req;

  // set isAuthenticated to true if req.auth is a truthy value. otherwise set to false.
  const isAuthenticated = !!req.auth;

  // use boolean value to determine if the requested route is a protected route
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  // redirect to signin if route is a protected route and user is not authenticated
  if (isProtectedRoute && !isAuthenticated)
    return Response.redirect(new URL("/signin", nextUrl));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
