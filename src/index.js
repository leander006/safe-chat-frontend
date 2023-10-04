import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/UserProvider";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketProvider";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
