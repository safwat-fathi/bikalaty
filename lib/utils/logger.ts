import pino from "pino";

const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";

const loggerConfig = {
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === "production" ? "info" : "debug"),
  // Use pino-pretty only in development and non-browser environments
  transport:
    process.env.NODE_ENV !== "production" && !isBrowser
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard", // More readable timestamp
            ignore: "pid,hostname", // Optional: Hide pid/hostname
          },
        }
      : undefined,
  // Base context - can add app name, etc.
  base: {
    // You might want different identifiers for server/client if needed
    // pid: undefined // Disable default pid if desired
    // hostname: undefined // Disable default hostname if desired
  },
  // Browser specific configuration (if logging client-side)
  browser: {
    // You might want to serialize less data or use a different transport
    // For example, send logs to an API endpoint instead of console
    // Or configure pino.transmit for sending logs
    asObject: true, // Log objects in the browser console
    // transmit: { // Example: Send logs to an API endpoint
    //   level: 'info',
    //   send: (level, logEvent) => {
    //     // Use fetch or axios to send logEvent to your /api/log endpoint
    //     const msg = JSON.stringify(logEvent);
    //     navigator.sendBeacon ? navigator.sendBeacon('/api/log', msg) : fetch('/api/log', { method: 'POST', body: msg, headers: {'Content-Type': 'application/json'} });
    //   }
    // }
  },
  // Add redaction for sensitive keys if needed
  // redact: ['password', 'secret', 'authorization'],
  timestamp: pino.stdTimeFunctions.isoTime, // ISO format timestamp
};

// Create the logger instance
const logger = pino(loggerConfig);

export default logger;
