import { io, Socket } from "socket.io-client";

// Define the type for our custom events
interface ServerToClientEvents {
  consumer_msg: (data: any) => void;
  user_credit_added: (data: any) => void;
  request_register: (data: any) => void;
}

interface ClientToServerEvents {
  consumer_msg: (data: any) => void;
  register_user: (email: string) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const initializeSocket = (): Socket<
  ServerToClientEvents,
  ClientToServerEvents
> => {
  if (!socket) {
    socket = io("http://localhost:4000", {
      transports: ["websocket"],
      // reconnectionAttempts: 3,
    });

    socket.on("connect", () => {
      console.log(`Connected to socket server with ID: ${socket.id}`);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  }
  return socket;
};

export default initializeSocket;
