"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { MouseEventHandler, PropsWithChildren, useEffect, useRef } from "react";

import useIsPageDirectionRTL from "@/lib/hooks/useIsPageDirectionRTL";
import CloseIcon from "@/lib/icons/CloseIcon";

const DynamicPortal = dynamic(() => import("../Portal"), { ssr: false });

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isStatic?: boolean;
  className?: HTMLDivElement["className"];
  title: string;
};

const Drawer = ({ isOpen, onClose, isStatic = true, title, className, children }: PropsWithChildren<Props>) => {
  const isRTL = useIsPageDirectionRTL();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClose: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== overlayRef.current) return;
    !isStatic && onClose();
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    if (!isOpen) document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <DynamicPortal portalId="#portal">
      {/* overlay */}
      <div
        ref={overlayRef}
        className={clsx(
          "inset-none fixed z-999 h-screen w-full bg-[rgba(0,0,0,0.62)] backdrop-blur transition-opacity duration-300",
          {
            "pointer-events-none opacity-0": !isOpen,
            "pointer-events-auto opacity-100": isOpen,
          }
        )}
        onClick={handleClose}
      >
        {/* drawer */}
        <div
          role="alert"
          className={clsx(
            "inset-y-none px-xl fixed w-[300px] transform overflow-y-auto bg-white transition-transform duration-300 md:w-[663px]",
            className,
            {
              "left-none right-auto": !isRTL,
              "right-none left-auto": isRTL,
              "-translate-x-full": !isOpen && !isRTL, // if LTR and not open
              "translate-x-full": !isOpen && isRTL, // if RTL and not open
              "-translate-x-none": isOpen && !isRTL, // if LTR and open
              "translate-x-none": isOpen && isRTL, // if RTL and open
            }
          )}
        >
          <div className="p-md drawer-title-bg h-7xl mb-4 flex items-center justify-between border-b border-gray-200 px-4">
            <h4 className="text-lg font-bold capitalize">{title}</h4>
            <button
              className="cursor-pointer rounded-full bg-white text-gray-500 transition-all duration-300 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="p-md">{children}</div>
        </div>
      </div>
    </DynamicPortal>
  );
};

export default Drawer;
