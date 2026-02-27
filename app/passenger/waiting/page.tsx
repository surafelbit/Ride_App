// pages/drivers.jsx
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";
import { ArrowLeft, Star, Car, MapPin } from "lucide-react";
import L from "leaflet";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import { useCoordinate } from "context/Coordinates";
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const DriversPage = () => {
  useEffect(() => {
    async function getter() {
      const data = await axios.post("");
    }
    getter();
  }, []);
  const { coordinate } = useCoordinate();
  console.log(coordinate);
  const [isWaiting, setIsWaiting] = useState(true);
  const position3 = [11.598, 37.3789];
  const position2 = [11.598, 37.3944];
  // Dummy drivers data
  const drivers = [
    {
      id: 1,
      name: "John Doe",
      rating: 4.8,
      car: "Toyota Camry",
      distance: "1.2 mi",
    },
    {
      id: 2,
      name: "Sarah Smith",
      rating: 4.9,
      car: "Honda Accord",
      distance: "0.8 mi",
    },
    {
      id: 3,
      name: "Mike Johnson",
      rating: 4.7,
      car: "Nissan Altima",
      distance: "1.5 mi",
    },
  ];
  console.log(coordinate);
  useEffect(() => {
    async function getLocation() {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { longitude, latitude } = position.coords;
          const userCoords = [latitude, longitude];
          //setAutomaticPosition([latitude, longitude]);
        });
      } catch (err) {}
    }
    getLocation();
  }, []);
  // Simulate waiting for drivers
  useEffect(() => {
    async function getter() {
      try {
        const something = await fetch("/api/location");
        const something2 = await something.json();
        console.log(something2);
      } catch (error) {}
    }
    getter();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 3000); // 3-second delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col p-4">
      <Head>
        <title>Find Drivers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Header with dummy back button */}
      <div className="flex items-center mb-4">
        <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 ml-3">
          {isWaiting ? "Searching for Drivers" : "Available Drivers"}
        </h1>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Waiting state */}
        {/* {isWaiting && (
          <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-lg font-semibold text-gray-700 mt-4">
              Searching for drivers...
            </p>
            <p className="text-sm text-gray-500 mt-2">Please wait a moment</p>
          </div>
        )} */}
        {isWaiting && (
          <div className="flex-1 relative flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden">
            {/* Subtle animated background map */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <MapContainer
                center={coordinate || [9.03, 38.74]} // Addis fallback
                zoom={12}
                scrollWheelZoom={false}
                dragging={false}
                zoomControl={false}
                attributionControl={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution=""
                />
                {coordinate && (
                  <Marker
                    position={coordinate}
                    icon={
                      new L.Icon({
                        ...customIcon.options,
                        className: "animate-pulse", // or your custom class
                      })
                    }
                  >
                    <Popup>Your location</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>

            {/* Foreground content */}
            <div className="relative z-10 text-center px-6 max-w-md">
              <div className="mb-8 relative">
                <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                  <Car className="w-14 h-14 text-blue-600" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-blue-400 opacity-40 animate-ping"></div>
                  <div className="w-40 h-40 rounded-full border-4 border-blue-300 opacity-30 animate-ping"></div>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Finding you a ride...
              </h2>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We're connecting you to the nearest available driver.
                <br />
                Usually takes{" "}
                <span className="font-semibold text-blue-700">
                  30–90 seconds
                </span>
                .
              </p>

              <div className="w-full max-w-xs mx-auto mb-10">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 w-1/3 animate-[progress_3s_ease-in-out_infinite]"></div>
                </div>
                <p className="text-sm text-gray-500 mt-3 animate-pulse">
                  Searching nearby drivers • Live
                </p>
              </div>

              {coordinate && (
                <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-md border border-gray-200 mb-8">
                  <MapPin className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    {coordinate[0].toFixed(5)}, {coordinate[1].toFixed(5)}
                  </span>
                </div>
              )}

              <button
                onClick={() => {
                  alert("Ride request cancelled (add real logic here)");
                  // socket.emit("cancel-ride-request");
                  // router.push("/");
                }}
                className="px-8 py-4 bg-white border-2 border-red-500 text-red-600 rounded-full font-semibold text-lg hover:bg-red-50 transition-all shadow-md active:scale-95"
              >
                Cancel Request
              </button>
            </div>

            <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-gray-500 opacity-70">
              Fun fact: Average wait time in Addis is getting shorter every
              month! 🚕
            </div>
          </div>
        )}

        {/* Drivers list */}
        {!isWaiting && (
          <div>
            <div className="flex-1 space-y-4">
              {drivers.map((driver) => (
                <div
                  key={driver.id}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                      <Car className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {driver.name}
                      </p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-xs text-gray-600">
                          {driver.rating}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{driver.car}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end">
                      <MapPin className="w-4 h-4 text-red-500 mr-1" />
                      <p className="text-xs text-gray-600">{driver.distance}</p>
                    </div>
                    <button className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition">
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p>your driver is found he is there and he is coming</p>
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
              {/* <ClickMapHandler onClick={setPointPosition} /> */}
              <Marker icon={customIcon} position={position3}>
                <Popup>Meskel Square your Driver is here</Popup>
              </Marker>
              <Marker icon={customIcon} position={coordinate}>
                <Popup>You</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

        {/* Dummy footer placeholder */}
        {!isWaiting && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">Book your ride now!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriversPage;
