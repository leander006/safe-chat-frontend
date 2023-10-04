import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { GetUser } from "./context/UserProvider";
function App() {
  const { user } = GetUser();
  console.log(user);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={user ? <Home /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
