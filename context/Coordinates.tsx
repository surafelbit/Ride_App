// "use client";
// import {
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   ReactNode,
// } from "react";
// const CoordindateContext = createContext<CoordinateContextType | undefined>(
//   undefined
// );
// type CoordinateContextType = {
//   latitude: Number;
//   longitude: Number;
//   setValue: () => void;
//   coordinate: [number, number] | null;
//   setCoordinate: (coordinate: [Number, Number]) => void;
//   somearray: [];
// };
// export function CoordinateProvider({ children }: { children: ReactNode }) {
//   const [coordinate, setCoordinate] = useState();
//   return (
//     <CoordindateContext.Provider value={{ setCoordinate, coordinate }}>
//       {children}
//     </CoordindateContext.Provider>
//   );
// }
// export function useCoordinate() {
//   const context = useContext(CoordindateContext);
//   if (!context)
//     throw new Error("useLocation must be used within LocationProvider");

//   return context;
// }
// context/Coordinates.tsx   (or wherever you keep it)
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// ─── Type definitions ────────────────────────────────────────
type Coordinate = [number, number] | null;

interface CoordinateContextType {
  coordinate: Coordinate;
  setCoordinate: (coord: Coordinate) => void;
  // If you later need latitude/longitude separately, you can derive them:
  // latitude: number | null;
  // longitude: number | null;
}

// ─── Create context with proper undefined fallback ───────────
const CoordinateContext = createContext<CoordinateContextType | undefined>(
  undefined
);

// ─── Provider component ──────────────────────────────────────
export function CoordinateProvider({ children }: { children: ReactNode }) {
  const [coordinate, setCoordinate] = useState<Coordinate>(null); // ← start with null

  return (
    <CoordinateContext.Provider value={{ coordinate, setCoordinate }}>
      {children}
    </CoordinateContext.Provider>
  );
}

// ─── Custom hook with safety check ───────────────────────────
export function useCoordinate() {
  const context = useContext(CoordinateContext);

  if (context === undefined) {
    throw new Error("useCoordinate must be used within a CoordinateProvider");
  }

  return context;
}
