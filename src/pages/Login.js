import React, { useCallback, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/service";
import { GetUser } from "../context/UserProvider";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = GetUser();
  const handleSubmitForm = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`${BASE_URL}/api/auth/login`, {
          username: username,
          password: password,
        });
        localStorage.setItem("user", JSON.stringify(data.others));
        localStorage.setItem("token", data.token);
        setUser(data.others);
      } catch (error) {
        console.log(error);
      }
    },
    [username, password]
  );
  return (
    <div className="mt-6">
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="username">Unsername</label>
        <input
          type="text"
          id="username"
          className="border"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
}

export default Login;
