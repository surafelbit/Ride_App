// // pages/index.jsx
// import { useState } from "react";
// import dynamic from "next/dynamic";
// import Head from "next/head";

// // Dynamically import react-leaflet components to avoid SSR issues
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

// export default function Page() {
//   const [mode, setMode] = useState("automatic"); // Default to automatic mode
//   const [position, setPosition] = useState([51.505, -0.09]); // Default map center (London)

//   // Placeholder for automatic location detection logic
//   const handleAutomaticLocation = () => {
//     // TODO: Implement geolocation API to fetch user's location
//     // Example: navigator.geolocation.getCurrentPosition()
//     console.log("Fetching automatic location...");
//   };

//   // Placeholder for manual location selection logic
//   const handleMapClick = (e) => {
//     // TODO: Capture clicked coordinates from map
//     console.log("Map clicked at:", e.latlng);
//     setPosition([e.latlng.lat, e.latlng.lng]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <Head>
//         <title>Location Selector</title>
//         <link
//           rel="stylesheet"
//           href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
//         />
//       </Head>
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
//           Select Location
//         </h1>

//         {/* Toggle between manual and automatic modes */}
//         <div className="flex justify-center mb-4">
//           <div className="inline-flex rounded-md shadow-sm" role="group">
//             <button
//               onClick={() => setMode("manual")}
//               className={`px-4 py-2 text-sm font-medium border ${
//                 mode === "manual"
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-700 border-gray-300"
//               } rounded-l-md hover:bg-blue-500 hover:text-white transition`}
//             >
//               Manual
//             </button>
//             <button
//               onClick={() => setMode("automatic")}
//               className={`px-4 py-2 text-sm font-medium border ${
//                 mode === "automatic"
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-700 border-gray-300"
//               } rounded-r-md hover:bg-blue-500 hover:text-white transition`}
//             >
//               Automatic
//             </button>
//           </div>
//         </div>

//         {/* Map for manual mode */}
//         {mode === "manual" && (
//           <div className="mb-4">
//             <div id="map" className="h-80 w-full rounded-md overflow-hidden">
//               <MapContainer
//                 center={position}
//                 zoom={13}
//                 style={{ height: "100%", width: "100%" }}
//                 whenCreated={(map) => {
//                   map.on("click", handleMapClick);
//                 }}
//               >
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 <Marker position={position}>
//                   <Popup>Selected Location</Popup>
//                 </Marker>
//               </MapContainer>
//             </div>
//             <p className="text-sm text-gray-600 mt-2">
//               Click on the map to select a location.
//             </p>
//           </div>
//         )}

//         {/* Automatic mode UI */}
//         {mode === "automatic" && (
//           <div className="text-center">
//             <button
//               onClick={handleAutomaticLocation}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//             >
//               Detect My Location
//             </button>
//             <p className="text-sm text-gray-600 mt-2">
//               Click to automatically detect your location.
//             </p>
//           </div>
//         )}

//         {/* Display selected/detected location */}
//         <div className="mt-4 text-center">
//           <p className="text-gray-700">
//             {mode === "manual"
//               ? `Selected: Lat ${position[0].toFixed(
//                   4
//                 )}, Lng ${position[1].toFixed(4)}`
//               : "No location detected yet."}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
