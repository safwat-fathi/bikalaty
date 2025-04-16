import { NextMiddleware } from "next/server";

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
export type EmptyObject = Record<string, unknown>;
