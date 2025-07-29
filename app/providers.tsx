"use client";

import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "context/ModalContext";
import { CoordinateProvider } from "context/Coordinates";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ModalProvider>
        <CoordinateProvider>{children}</CoordinateProvider>
      </ModalProvider>
    </SessionProvider>
  );
}
