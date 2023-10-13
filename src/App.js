import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Room from "./pages/Room";
import { GetUser } from "./context/UserProvider";
import Users from "./pages/Users";
import EmailVerificatiion from "./pages/EmailVerificatiion";
import { useSocket } from "./context/SocketProvider";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import Meeting from "./pages/Meeting";
import Setting from "./pages/Setting";
function App() {
  const { user, setUser, setConfig } = GetUser();
  const navigate = useNavigate();
  const { socket, setNotification, notification } = useSocket();
  const handleNotification = useCallback((data) => {
    toast.success(`${data.username} send you invite to join room`);
    setNotification(!notification);
  }, []);

  const diseable = useCallback(async ({ roomId }) => {
    console.log("notification");
    toast.success("Room deactivated");
    navigate("/");
  }, []);

  useEffect(() => {
    socket?.on("got-notification", handleNotification);
    socket.on("delete_room", diseable);
    return () => {
      socket.off("got-notification", handleNotification);
      socket.off("delete_room", diseable);
    };
  });

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/user" element={user ? <Users /> : <Login />} />
        <Route path="/room" element={user ? <Room /> : <Login />} />
        <Route path="/meeting/:id" element={user ? <Meeting /> : <Login />} />
        <Route path="/setting" element={user ? <Setting /> : <Login />} />
        <Route
          path="/users/:id/verify/:token"
          element={user ? <EmailVerificatiion /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default App;
