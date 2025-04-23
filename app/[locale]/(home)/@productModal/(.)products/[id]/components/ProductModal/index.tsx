"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import styles from "./ProductModal.module.css";

const titleId = "modal-title";
const descriptionId = "modal-description";

export function ProductModal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const originalOverflowRef = useRef<string>("");

  useEffect(() => {
    // Store the original style *before* changing it
    originalOverflowRef.current = document.body.style.overflow;
    // Prevent body scrolling
    document.body.style.overflow = "hidden";

    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }

    // Cleanup function: Restore original body scroll on unmount
    return () => {
      document.body.style.overflow = originalOverflowRef.current; // Restore the exact previous value
    };
  }, []);

  function onDismiss() {
    router.back();
  }

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className={styles.backdrop}>
      <dialog
        ref={dialogRef}
        className={styles.modal}
        onClose={onDismiss}
        aria-modal="true"
        role="dialog"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        {children}
        <button onClick={onDismiss} className={styles.closeButton} aria-label="Close modal" />
      </dialog>
    </div>,
    modalRoot
  );
}
