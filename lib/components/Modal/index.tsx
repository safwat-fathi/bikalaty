"use client";

import clsx from "clsx";
import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  title: ReactNode | string;
  isOpen: boolean;
  fixed?: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ title, isOpen, fixed = false, onClose, children }: ModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = ref.current;

    if (isOpen) {
      dialogElement?.showModal();
    } else {
      dialogElement?.close();
    }

    const handleEscClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (!fixed) onClose();
        else event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  return (
    <dialog ref={ref} className={clsx("modal", { hidden: !isOpen })} onClick={fixed ? undefined : onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <form method="dialog" className="modal-backdrop mb-4 flex items-center justify-between">
          <h2 className="m-0 text-2xl font-bold text-black">{title}</h2>
          {!fixed && (
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
              ✕
            </button>
          )}
        </form>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
