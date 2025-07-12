"use client";
import React, { useContext, useState, createContext, ReactNode } from "react";
const ModalContext = createContext<ModalContextType | undefined>(undefined);
type ModalContextType = {
  isOpen: boolean;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};
export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  function openModal(content: ReactNode) {
    setModalContent(content);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
    setModalContent(null);
  }
  return (
    <ModalContext.Provider
      value={{ isOpen, modalContent, openModal, closeModal }}
    >
      {children}
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/20 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
          >
            {modalContent}
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
}
