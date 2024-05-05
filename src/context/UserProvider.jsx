import Peer from "peerjs";
import React, {
  createContext,
  useMemo,
  useContext,
  useState,
  useEffect,
} from "react";

export const UserContext = createContext(null);

export const GetUser = () => {
  const user = useContext(UserContext);
  return user;
};

export const UserProvider = ({ children }) => {
  const initialUserData = useMemo(() => {
    const userDataFromLocalStorage = localStorage?.getItem("user");
    return userDataFromLocalStorage
      ? JSON.parse(userDataFromLocalStorage)
      : null;
  }, []);

  // User state that can be updated in the future
  const [user, setUser] = useState(initialUserData);
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState();
  const [config, setConfig] = useState(null);

  const fetUserFeed = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(stream);
  };
  // Whenever userData changes, update the localStorage value
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    const newPeer = new Peer(user?._id, {
      host: "localhost",
      port: 9000,
      path: "/",
    });
    setPeer(newPeer);
    fetUserFeed();
    setConfig({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage?.getItem("token")}`,
      },
    });
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, config, peer, setPeer, setConfig, stream }}
    >
      {children}
    </UserContext.Provider>
  );
};
