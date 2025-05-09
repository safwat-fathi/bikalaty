"use client";

import { useEffect } from "react";

import logger from "@/lib/utils/logger";
import { useScopedI18n } from "@/locales/client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const tGlobal = useScopedI18n("global");

  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <h1>{tGlobal("error.globalError")}.</h1>
        <button className="btn btn-outline" onClick={reset}>
          {tGlobal("actions.tryAgain")}?
        </button>
      </body>
    </html>
  );
}
