// import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// import { MiddlewareFactory } from "@/types";

// import CONSTANTS from "../constants";
// import JWTService from "../services/jwt.service";
// import { getLocale } from "../utils/url";

// export const withUser: MiddlewareFactory = (next) => {
//   return async (request: NextRequest, _next: NextFetchEvent) => {
//     const jwtService = new JWTService();
//     const pathname = request.nextUrl.pathname;

//     const locale = getLocale(pathname);

//     // const requiredPermissions = getRequiredPermissions(pathname);

//     const accessToken = request.cookies.get(CONSTANTS.ACCESS_TOKEN);

//     // const user =
//     //   request.cookies.get(CONSTANTS.USER)?.value &&
//     //   (JSON.parse(request.cookies.get(CONSTANTS.USER)?.value || "null") as User | null);

//     const response = NextResponse;

//     // If the route doesn't require permissions, allow access
//     // if (!requiredPermissions) {
//     //   return response.next();
//     // }

//     const isLoginRoute = pathname.endsWith("/login");
//     const isSignupRoute = pathname.endsWith("/signup");

//     const tokenIsExpired = await jwtService.hasTokenExpired(accessToken?.value || "");
//     const refreshToken = request.cookies.get(CONSTANTS.REFRESH_TOKEN);
//     // get a new access token when the access token is expired and the user is logged in
//     if (accessToken && refreshToken && tokenIsExpired && !isLoginRoute) {
//       const url = new URL(`/api/auth/refresh?redirect=${request.nextUrl.pathname}`, request.url);

//       return response.redirect(url);
//     }

//     // prevent login and signup routes if user is logged in
//     if (accessToken && !tokenIsExpired && (isLoginRoute || isSignupRoute)) {
//       const url = new URL(`/${locale}`, request.url);

//       return response.redirect(url);
//     }

//     // const userRole: UserRole = user ? user.role.name : "visitor";
//     // const userId = user && user.id;

//     // const userPermissions = CONSTANTS.ROLES_PERMISSIONS[userRole];

//     // const hasRequiredPermissions = requiredPermissions.some((requiredPermission) => {
//     //   const [, , ownership] = requiredPermission.split(":");
//     //   return (
//     //     (ownership === "any" && userPermissions.includes(requiredPermission)) ||
//     //     userPermissions.includes("manage:all:any")
//     //   );
//     // });

//     // if (!hasRequiredPermissions) {
//     //   const url = new URL(`/${locale}/unauthorized`, request.url);
//     //   return response.redirect(url);
//     // }

//     return next(request, _next);
//   };
// };
