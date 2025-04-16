"use client";

import { RefObject, useEffect, useRef } from "react";

const useGlobalRef = (el: HTMLElement): RefObject<HTMLElement | null> => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (el) ref.current = el;
  }, []);

  return ref;
};

export default useGlobalRef;
