import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/UserProvider";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketProvider";
import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <SocketProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </SocketProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
