"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Users,
  DollarSign,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";
import { socket } from "@/lib/socket"; // single shared socket instance
import { createPortal } from "react-dom";
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const customIconFrom = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
function Routing({
  from,
  to,
}: {
  from: [number, number];
  to: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }],
      },
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false, // set to true if you want turn-by-turn panel
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [from, to, map]);

  return null;
}
// const socket = io("http://localhost:3000", {
//   // path: "/api/socket",
//   transports: ["websocket", "polling"],
// });

export default function DriverDashboard() {
  const { data: session, status } = useSession();
  console.log(session?.user.id);
  const [message, setMessage] = useState("");
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [position, setPosition] = useState(null);
  //   const [position, setPosition] = useState<[number, number] | null>([
  //     9.03, 38.74,
  //   ]);
  const from: [number, number] = [11.5936, 37.3908 + 0.053];
  const to: [number, number] = [11.5936, 37.3908];
  // const from: [number, number] = [51.505, -0.09];
  // const to: [number, number] = [51.51, -0.1];
  const position = [11.5936, 37.3908 + 0.053];
  // const position = [48.8566, 2.3522]; // [latitude, longitude]
  const position2 = [11.5936, 37.3908];
  const position3 = [11.598, 37.3789];
  const [online, setOnline] = useState<boolean>(false);
  const router = useRouter();
  const [input, setInput] = useState();
  const [locationPassenger, setLocationPassenger] = useState();
  const [locationPassenger2, setLocationPassenger2] = useState();
  const [loadingLocation, setLoadingLocation] = useState(true);
  interface Passenger {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
  }

  const [usersArray, setUsersArray] = useState<Passenger[]>([]);
  const [automaticPosition, setAutomaticPosition] = useState<
    [number, number] | null
  >(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!session?.user?.id) return;

    const initSocket = async () => {
      // Initialize the Socket.IO server on the API route
      await fetch("/api/socket");

      if (!socket.connected) {
        socket.connect();
      }

      socket.on("connect", () => {
        console.log("Connected to WebSocket!");
        socket.emit("Driver-Online", {
          id: session?.user.id,
        });
      });

      const handlePassengerFound = (data: any) => {
        if (data.latitude && data.longitude && data.userId) {
          setUsersArray((prev) => {
            // avoid duplicates by filtering existing
            const filtered = prev.filter((p) => p.id !== data.userId);
            return [
              ...filtered,
              {
                id: data.userId,
                name: data.name || "Anonymous",
                latitude: data.latitude,
                longitude: data.longitude,
              },
            ];
          });
        }
      };

      socket.on("passenger-found", handlePassengerFound);
    };

    initSocket();
    console.log(usersArray);
    return () => {
      socket.off("connect");
      socket.off("passenger-found");
      socket.disconnect();
    };
  }, [session?.user?.id]);

  const sendMessage = () => {
    socket.emit("message", "hello from the client side");
  };
  useEffect(() => {
    async function getter() {
      if (!navigator.geolocation) {
        alert("Couldn't access location");
        return;
      }
      const datas = await fetch("/api/location");
      const answer = await datas.json();
      console.log(answer, "something here");
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          setAutomaticPosition([latitude, longitude]);
          setLoadingLocation(false);
          //   setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error: GeolocationPositionError) => {
          console.error("Geolocation error:", error);
          setLoadingLocation(false);
        }
      );
    }
    getter();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  interface Ride {
    id: number;
    passenger: string;
    destination: string;
    fare: string;
  }
  interface Passenger {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
  }

  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    passenger: Passenger | null;
  }

  function PassengerConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    passenger,
  }: ModalProps) {
    if (!isOpen) return null;

    const name = passenger?.name ?? "Passenger";

    const modalContent = (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto">
        {/* Backdrop – clicks here close the modal */}
        <div
          className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* The actual modal box – centered vertically & horizontally */}
        <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-[360px] mx-4 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Pick up {name}?
          </h2>

          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Are you sure you want to accept this ride request?
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm"
            >
              Confirm Pickup
            </button>
          </div>
        </div>
      </div>
    );

    // Portal → renders directly into <body> → beats Leaflet z-index issues
    return typeof window !== "undefined"
      ? createPortal(modalContent, document.body)
      : null;
  }
  const rides: Ride[] = [
    { id: 1, passenger: "Sam", destination: "Downtown", fare: "$5.95" },
    { id: 2, passenger: "Alex", destination: "Uptown", fare: "$7.50" },
    { id: 3, passenger: "Emma", destination: "Midtown", fare: "$6.20" },
    { id: 4, passenger: "Liam", destination: "Westside", fare: "$8.10" },
  ];
  const handleAutomaticLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { longitude, latitude } = position.coords;
        const userCoords = [latitude, longitude];
        setAutomaticPosition([latitude, longitude]);
      });
    } catch (error) {}
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <button
        onClick={sendMessage}
        className="ml-2 bg-blue-500 text-white px-2"
      >
        Send
      </button>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          👋 Welcome, Driver!
        </h1>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={online}
              onChange={() => setOnline(!online)}
              className="sr-only"
            />
            <div
              className={`w-10 h-5 rounded-full ${
                online ? "bg-green-500" : "bg-gray-300"
              } relative`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                  online ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
            <span className="text-gray-700 font-medium">
              {online ? "🟢 Online" : "🔴 Offline"}
            </span>
          </label>
        </div>
      </header>

      <main className="space-y-6">
        {loadingLocation && (
          <div className="bg-blue-100 p-3 rounded text-center text-blue-700">
            Detecting your location...
          </div>
        )}
        {!loadingLocation && (
          <MapContainer
            center={automaticPosition}
            zoom={14}
            scrollWheelZoom={true}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {/* <Marker icon={customIcon} position={position3}>
              <Popup>Meskel Square</Popup>
            </Marker> */}
            {/* {usersArray.length > 0 &&
              usersArray.map((passenger) => (
                <Marker
                  key={passenger.id}
                  icon={customIcon}
                  position={[passenger.latitude, passenger.longitude]}
                >
                  <Popup>
                    {passenger.name} <br /> {passenger.latitude.toFixed(5)},{" "}
                    {passenger.longitude.toFixed(5)}
                  </Popup>
                </Marker>
              ))} */}
            {usersArray.length > 0 &&
              usersArray.map((passenger) => (
                <Marker
                  key={passenger.id}
                  icon={customIcon}
                  position={[passenger.latitude, passenger.longitude]}
                  eventHandlers={{
                    click: () => {
                      setSelectedPassenger(passenger);
                      setIsModalOpen(true);
                    },
                  }}
                >
                  <Popup>
                    {passenger.name} <br /> {passenger.latitude.toFixed(5)},{" "}
                    {passenger.longitude.toFixed(5)}
                  </Popup>
                </Marker>
              ))}
            {automaticPosition && (
              <Marker icon={customIconFrom} position={automaticPosition}>
                <Popup>Your Current Location</Popup>
              </Marker>
            )}
            {/* {usersArray[0] != undefined && (
              <Marker icon={customIcon} position={usersArray}>
                <Popup>Meskel Square</Popup>
              </Marker>
            )}
            <Marker icon={customIcon} position={to}>
              <Popup>Bole Airport</Popup>
            </Marker> */}

            {/* <Routing from={from} to={to} /> */}
          </MapContainer>
        )}
        {online ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-2">
              <MapPin className="text-blue-600" />
              <p className="text-gray-600">
                Interactive map placeholder (Coming soon)
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-100 p-4 rounded-lg shadow-sm text-center">
            <p className="text-yellow-800 font-medium">
              Please turn on your location to view the map
            </p>
          </div>
        )}

        <section className="relative">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Rides
          </h2>
          <div className="flex items-center">
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 py-2"
              style={{ scrollBehavior: "smooth" }}
            >
              {rides.map((ride) => (
                <div
                  key={ride.id}
                  className="snap-center flex-shrink-0 w-64 bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <Users className="text-blue-600" size={20} />
                    <p className="text-gray-800 font-semibold">
                      {ride.passenger}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    To: {ride.destination}
                  </p>
                  <p className="text-green-600 font-bold text-lg mt-2">
                    {ride.fare}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="mr-2 text-blue-600" /> Daily Summary
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Users className="text-blue-600" />
              <div>
                <p className="text-gray-600">Customers Contacted</p>
                <p className="text-xl font-bold text-gray-800">7</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="text-blue-600" />
              <div>
                <p className="text-gray-600">Total Earnings</p>
                <p className="text-xl font-bold text-gray-800">$42.75</p>
              </div>
            </div>
          </div>
        </section>

        <button
          onClick={() => router.push("/driver/requests")}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          View Ride Requests
        </button>
        <PassengerConfirmModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPassenger(null);
          }}
          onConfirm={() => {
            if (selectedPassenger) {
              console.log("Confirmed pickup for:", selectedPassenger.name);
              // Here you would normally:
              // socket.emit("driver-accepts-ride", {
              //   driverId: session?.user?.id,
              //   passengerId: selectedPassenger.id
              // });
            }
            setIsModalOpen(false);
            setSelectedPassenger(null);
          }}
          passenger={selectedPassenger}
        />
      </main>
    </div>
  );
}
