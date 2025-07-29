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

    io.on("connection", (socket) => {
      console.log("✅ Client connected:", socket.id);

      socket.emit("message", "Welcome from server!");
      socket.on("user-online", (userData) => {
        console.log("🟢 User is online:", userData);

        socket.broadcast.emit("user-joined", {
          message: "libla timmy",
          userId: userData.userId,
        });
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
