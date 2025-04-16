import { NextMiddleware, NextResponse } from "next/server";

import { MiddlewareFactory } from "@/types";

import logger from "../utils/logger";

export function stackMiddlewares(functions: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  // Validate input parameters
  if (!Array.isArray(functions)) {
    logger.error("Expected middleware functions array");
    return () => NextResponse.next();
  }

  // Validate index
  if (!Number.isInteger(index) || index < 0) {
    logger.error(`Invalid middleware index: ${index}`);
    return () => NextResponse.next();
  }

  // If we've processed all functions, return the final handler
  if (index >= functions.length) {
    return () => NextResponse.next();
  }

  // Get current middleware function safely
  const current = functions.slice(index, index + 1)[0];

  if (typeof current === "function") {
    // Create next middleware in the stack
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }

  // If current middleware is invalid, skip to next
  logger.warn(`Invalid middleware at index ${index}`);
  return stackMiddlewares(functions, index + 1);
}
