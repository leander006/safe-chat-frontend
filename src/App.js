import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Room from "./pages/Room";
import { GetUser } from "./context/UserProvider";
import Create from "./pages/Create";
import About from "./pages/About";
import Users from "./pages/Users";
function App() {
  const { user } = GetUser();
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/about" element={user ? <About /> : <Login />} />
        <Route path="/user" element={user ? <Users /> : <Login />} />
        <Route path="/create" element={user ? <Create /> : <Login />} />
        <Route path="/room/:id" element={user ? <Room /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
