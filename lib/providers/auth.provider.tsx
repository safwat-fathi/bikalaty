// "use client";

// import { useRouter } from "next/navigation";
// import { type ReactNode, useEffect, useRef, useState } from "react";

// import { deleteCookieAction, getCookieAction } from "@/app/[locale]/actions";

// import CONSTANTS from "../constants";
// import JWTService from "../services/jwt.service";
// import { refreshAccessToken } from "../utils/auth";

// type Props = {
//   children: ReactNode;
// };

// const AuthProvider = ({ children }: Props) => {
//   const router = useRouter();

//   const [error, setError] = useState(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const refreshToken = async () => {
//     try {
//       const currentToken = await getCookieAction(CONSTANTS.ACCESS_TOKEN);

//       if (!currentToken) return;

//       const jwtService = new JWTService();
//       const tokenIsExpired = await jwtService.hasTokenExpired(currentToken);

//       if (tokenIsExpired) {
//         await deleteCookieAction(CONSTANTS.REFRESH_TOKEN);
//         await deleteCookieAction(CONSTANTS.ACCESS_TOKEN);
//         await deleteCookieAction(CONSTANTS.USER);

//         router.push("/login");
//       }

//       await refreshAccessToken();
//     } catch (error: any) {
//       setError(true);
//     }
//   };

//   useEffect(() => {
//     // calls refreshToken every 14m
//     intervalRef.current = setInterval(refreshToken, 1000 * 60 * 14);

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, []);

//   useEffect(() => {
//     if (error && intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//   }, [error]);

//   return <>{children}</>;
// };

// export { AuthProvider };
