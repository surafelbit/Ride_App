"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function AddLocationPage() {
  const [mode, setMode] = useState<"manual" | "auto" | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);

  const handleAutoLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError("");
      },
      (err) => setError("Permission denied or unavailable")
    );
  };

  useEffect(() => {
    if (mode === "manual" && mapRef.current && !leafletMap.current) {
      leafletMap.current = L.map(mapRef.current).setView([15.383, 42.8558], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(leafletMap.current);

      const marker = L.marker([15.383, 42.8558], {
        draggable: true,
      }).addTo(leafletMap.current);

      marker.on("dragend", () => {
        const pos = marker.getLatLng();
        console.log("New marker position:", pos);
        setCoords({ lat: pos.lat, lng: pos.lng });
      });
    }

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [mode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 space-y-6">
      <h1 className="text-2xl font-bold text-center">Select Location Mode</h1>

      {!mode && (
        <div className="flex gap-4">
          <button
            onClick={() => setMode("manual")}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow"
          >
            Add Place on Map
          </button>
          <button
            onClick={() => {
              setMode("auto");
              handleAutoLocation();
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-xl shadow"
          >
            Use Current Location
          </button>
        </div>
      )}

      {mode === "manual" && (
        <div className="w-full max-w-2xl h-[400px]">
          <div ref={mapRef} className="h-full w-full rounded-xl shadow-md" />
        </div>
      )}

      {mode === "auto" && (
        <div>
          {error && <p className="text-red-600">{error}</p>}
          {coords ? (
            <div className="text-center text-lg">
              <p>Latitude: {coords.lat}</p>
              <p>Longitude: {coords.lng}</p>
            </div>
          ) : (
            !error && <p className="text-gray-600">Fetching location...</p>
          )}
        </div>
      )}
    </div>
  );
}
