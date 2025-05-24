import { createContext, useMemo, useContext, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";
import { BASE_URL } from "../utils/service";

// Create a context with a default value of null
const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const Endpoint = `${BASE_URL}/`;
  const socket = useMemo(() => io(Endpoint), [Endpoint]); // Memoize the socket

  return (
    
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
  
};
