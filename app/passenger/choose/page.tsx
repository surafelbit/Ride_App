// pages/index.jsx
"use client";
import { useModal } from "context/ModalContext";
import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapPin,
  Users,
  DollarSign,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCoordinate } from "context/Coordinates";
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
// Dynamically import react-leaflet components to avoid SSR issues
// const MapContainer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.MapContainer),
//   { ssr: false }
// );
// const TileLayer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.TileLayer),
//   { ssr: false }
// );
// const Marker = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Marker),
//   { ssr: false }
// );
// const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
//   ssr: false,
// });

function ClickMapHandler({
  onClick,
}: {
  onClick: (pos: [number, number]) => void;
}) {
  useMapEvent({
    click(e) {
      const latlng: [number, number] = [e.latlng.lat, e.latlng.lng];
      console.log("🗺️ Map clicked at:", latlng); // ✅ Console output
      onClick(latlng);
    },
  });
  return null;
}
const LocationSelectorPage = () => {
  const { setCoordinate } = useCoordinate();
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [automaticPosition, setAutomaticPosition] = useState([]);
  const [pointPosition, setPointPosition] = useState<[number, number]>([
    9.03, 38.74,
  ]);

  const [mode, setMode] = useState("automatic"); // Default to automatic mode
  const [position, setPosition] = useState([51.505, -0.09]); // Default map center (London)
  const [locationStatus, setLocationStatus] = useState(
    "No location detected yet."
  );

  // Placeholder for map click in manual mode
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    console.log("something");
    setLocationStatus(`Selected: Lat ${lat.toFixed(4)}, Lng ${lng.toFixed(4)}`);
    console.log(locationStatus);
  };
  const position3 = [11.598, 37.3789];

  // Placeholder for automatic location detection
  const handleAutomaticLocation = () => {
    setLocationStatus("Detecting location...");
    const someCondition = true;
    const xy = navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        const userCoords = [latitude, longitude];
        setAutomaticPosition([latitude, longitude]);
        setCoordinate([latitude, longitude]);
        console.log(position);
        openModal(
          <div className="bg-gradient-to-r from-red-500 to-orange-400 p-5 rounded-xl shadow-lg text-center font-sans text-white max-w-xs mx-auto">
            <p>Location Found</p>
            <div>
              <MapContainer
                center={userCoords}
                zoom={14}
                scrollWheelZoom={true}
                style={{ height: "250px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {/* <ClickMapHandler onClick={setPointPosition} /> */}
                <Marker icon={customIcon} position={userCoords}>
                  <Popup>Meskel Square</Popup>
                </Marker>

                {/* <Routing from={from} to={to} /> */}
              </MapContainer>
            </div>
            <p className="text-2xl font-bold mb-4">Are you sure?</p>
            <button
              onClick={() => {
                router.push("/passenger/waiting");
                closeModal();
              }}
              className="bg-white text-red-500 border-none py-2 px-5 rounded-full text-base cursor-pointer hover:scale-105 transition-transform shadow-md"
            >
              Call A Taxi Now
            </button>
          </div>
        );
      },
      (error) => {
        console.log(error);
      }
    );

    // setTimeout(() => {
    //   setPosition([51.51, -0.1]);
    //   setLocationStatus("Detected: Lat 51.5100, Lng -0.1000");
    // }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col p-4">
      <Head>
        <title>Location Selector</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
      </Head>

      {/* Header with dummy back button */}
      <div className="flex items-center mb-4">
        <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 ml-3">
          Choose Location
        </h1>
      </div>

      {/* Toggle between manual and automatic modes */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-white rounded-full shadow-md p-1">
          <button
            onClick={() => setMode("manual")}
            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              mode === "manual"
                ? "bg-blue-600 text-white shadow-inner"
                : "text-gray-600"
            }`}
          >
            Manual
          </button>
          <button
            onClick={() => setMode("automatic")}
            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              mode === "automatic"
                ? "bg-blue-600 text-white shadow-inner"
                : "text-gray-600"
            }`}
          >
            Automatic
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Map for manual mode */}
        {mode === "manual" && (
          <div className="flex-1 mb-4 rounded-lg overflow-hidden shadow-xl">
            {/* <MapContainer
              center={position}
              zoom={13}
              style={{ height: "100%", minHeight: "300px", width: "100%" }}
              whenCreated={(map) => {
                map.on("click", handleMapClick);
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>Selected Location</Popup>
              </Marker>
            </MapContainer> */}
            <MapContainer
              center={position3}
              zoom={14}
              scrollWheelZoom={true}
              style={{ height: "500px", width: "100%" }}
              // whenCreated={(map) => {
              //   map.on("click", handleMapClick); // Attach handleMapClick here
              // }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <ClickMapHandler onClick={setPointPosition} />
              <Marker icon={customIcon} position={position3}>
                <Popup>Meskel Square</Popup>
              </Marker>
            </MapContainer>
            <p className="text-xs text-gray-500 text-center mt-2 animate-pulse">
              Tap the map to pick a location
            </p>
          </div>
        )}

        {/* Automatic mode UI */}
        {mode === "automatic" && (
          <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6 ">
            <MapPin className="w-16 h-16 text-blue-500 mb-4 animate-bounce" />
            <button
              onClick={handleAutomaticLocation}
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold text-lg 
              hover:bg-blue-700 hover:shadow-xl hover:scale-105 
              transition-all duration-300 cursor-pointer"
            >
              Detect My Location
            </button>
            <p className="text-sm text-gray-500 mt-3 text-center">
              Allow location access to find your position
            </p>
          </div>
        )}

        {/* Dummy location card */}
        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-red-500 mr-2" />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Current Location
              </p>
              <p className="text-xs text-gray-500">{locationStatus}</p>
            </div>
          </div>
        </div>

        {/* Dummy confirm button */}
        <button className="mt-6 w-full py-3 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg">
          Confirm Location
        </button>

        {/* Dummy footer placeholder */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">Ride safely with us!</p>
        </div>
      </div>
    </div>
  );
};

export default LocationSelectorPage;
