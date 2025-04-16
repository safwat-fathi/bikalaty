import { useEffect, useState } from "react";

import { useCurrentLocale } from "@/locales/client";

const useIsPageDirectionRTL = (): boolean => {
  const locale = useCurrentLocale();
  const [isRTL, setIsRTL] = useState(locale === "ar");

  useEffect(() => {
    setIsRTL(locale === "ar");
  }, [locale]);

  return isRTL;
};

export default useIsPageDirectionRTL;
