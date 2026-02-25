// lib/socket.ts
import { io } from "socket.io-client";

export const socket = io({
  path: "/api/socket",
  autoConnect: false,
});

export default socket;
