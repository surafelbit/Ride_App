// pages/api/socket.ts

import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "../../types/next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    console.log("🔌 Initializing Socket.IO server...");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
    });
    const onlineDrivers = new Map();
    const onlinePassengers = new Map();
    io.on("connection", (socket) => {
      console.log("✅ Client connected:", socket.id);
      console.log("something is happening");
      socket.emit("message", "Welcome from server!");
      socket.on("Driver-Online", (driverData) => {
        onlineDrivers.set(driverData.id, socket.id);
        console.log(onlineDrivers, "this are the online drivers");
        // Send all online passengers to this driver
        for (const [, passengerSocketId] of onlinePassengers) {
          const passenger = { id: passengerSocketId }; // You might store more data
          socket.emit("passenger-found", passenger);
        }
      });

      socket.on("Passenger-Online", (passengerData) => {
        onlinePassengers.set(passengerData.id, socket.id);
        console.log(onlinePassengers, "online passengers");
        // Notify all drivers about this new passenger
        for (const [, driverSocketId] of onlineDrivers) {
          io.to(driverSocketId).emit("passenger-found", passengerData);
        }
      });

      socket.on("message", (msg) => {
        console.log("📨 Message from client:", msg);
        io.emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("⚠️ Socket.IO already running");
  }

  res.end();
}
