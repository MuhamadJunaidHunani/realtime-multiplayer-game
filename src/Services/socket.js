import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:8080";

// Initialize socket connection
export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

export const joinRoom = (roomId, playerName) => {
  socket.emit("join-room", { roomId, playerName });
};

export const moveCar = (roomId, x, y) => {
  socket.emit("car-move", { roomId, x, y });
};
