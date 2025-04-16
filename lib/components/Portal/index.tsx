import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import useGlobalRef from "@/lib/hooks/useGlobalRef";

const Portal = ({ portalId, children }: { portalId: string; children: ReactNode }) => {
  const portalRef = useGlobalRef(document.querySelector<HTMLElement>(portalId)!);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (portalRef && portalRef.current && mounted) {
    return createPortal(children, portalRef.current);
  }

  return null;
};

export default Portal;
