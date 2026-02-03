import React, { useRef, useEffect } from "react";

export const Modal = ({
  isOpen,
  onClose,
  children,
  className = "",
  showCloseButton = true,
  isFullscreen = false,
}) => {
  const modalRef = useRef(null);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose && onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : "relative w-full rounded-3xl bg-white dark:bg-gray-900";

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto">
      {!isFullscreen && (
        <div
          className="fixed inset-0 bg-gray-400/50 backdrop-blur-[32px]"
          onClick={onClose}
        />
      )}

      <div
        ref={modalRef}
        className={`${contentClasses} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11"
          >
            ✕
          </button>
        )}

        {children}
      </div>
    </div>
  );
};
