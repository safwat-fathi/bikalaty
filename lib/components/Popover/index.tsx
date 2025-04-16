"use client";

import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from "react";

import useOutsideClick from "@/lib/hooks/useOutsideClick";

type Direction = "top" | "right" | "bottom" | "left";
type Trigger = "click" | "hover";
type Props = PropsWithChildren<{
  content: ReactNode;
  trigger?: Trigger;
  direction?: Direction;
}>;

function Popover({ children, content, trigger = "click", direction = "right" }: Props) {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = () => {
    if (trigger === "hover") {
      setShow(true);
    }
  };

  const handleMouseLeft = () => {
    if (trigger === "hover") {
      setShow(false);
    }
  };

  const getPopoverPosition = () => {
    switch (direction) {
      case "top":
        return "bottom-[100%] left-1/2 transform -translate-x-1/2";
      case "right":
        return "left-[100%] top-1/2 transform -translate-y-1/2";
      case "bottom":
        return "top-[100%] left-1/2 transform -translate-x-1/2";
      case "left":
        return "right-[100%] top-1/2 transform -translate-y-1/2";
      default:
        return "";
    }
  };

  const getPopoverSpacing = () => {
    switch (direction) {
      case "top":
        return "my-2";
      case "bottom":
        return "my-2";
      case "right":
        return "mx-2";
      case "left":
        return "mx-2";
      default:
        return "";
    }
  };

  const hidePopover = () => setShow(false);

  useOutsideClick(wrapperRef, hidePopover);

  // hide the popover when clicking outside
  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", hidePopover);
      return () => {
        document.removeEventListener("mousedown", hidePopover);
      };
    }
  }, [show, wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeft}
      className="relative flex h-fit w-fit justify-center"
    >
      <div onClick={() => setShow(!show)}>{children}</div>
      <div hidden={!show} className={`absolute ${getPopoverPosition()} z-50 h-fit w-[200px] min-w-fit transition-all`}>
        <div className={`${getPopoverSpacing()} rounded bg-white p-3 shadow-[10px_30px_150px_rgba(46,38,92,0.25)]`}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default Popover;
