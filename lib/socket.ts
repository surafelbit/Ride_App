// lib/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  path: "/api/socket",
  transports: ["websocket"],
});

export default socket;
