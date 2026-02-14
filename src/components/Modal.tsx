import { useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

interface ModalProps {
  onClose: () => void;
  width?: string;
  children: React.ReactNode;
}

const Modal = ({ onClose, children, width }: ModalProps) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div
        className={clsx(
          "bg-middle-gray rounded-xl shadow-xl py-10 border border-light-gray relative",
          width ? width : "w-141.5"
        )}
      >
        <button
          type="button"
          className="absolute top-4 right-4 cursor-pointer rotate-90"
          onClick={onClose}
        >
          <svg
            className="stroke-white hover:stroke-[#d87f7f] hover:rotate-90 transition duration-300 ease-in-out"
            width={22}
            height={22}
          >
            <use href="/icons.svg#x"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
