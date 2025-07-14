"use client";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
const CoordindateContext = createContext<CoordinateContextType | undefined>(
  undefined
);
type CoordinateContextType = {
  latitude: Number;
  longitude: Number;
  setValue: () => void;
  coordinate: [number, number] | null;
  setCoordinate: (coordinate: [Number, Number]) => void;
  somearray: [];
};
export function CoordinateProvider({ children }: { children: ReactNode }) {
  const [coordinate, setCoordinate] = useState();
  return (
    <CoordindateContext.Provider value={{ setCoordinate, coordinate }}>
      {children}
    </CoordindateContext.Provider>
  );
}
export function useCoordinate() {
  const context = useContext(CoordindateContext);
  if (!context)
    throw new Error("useLocation must be used within LocationProvider");

  return context;
}
