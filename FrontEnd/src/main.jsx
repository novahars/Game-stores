import ReactDOM from "react-dom/client";
import React from "react";
import "./main.css";
import App from "./App";
import axios from "axios";
import AuthContextProvider from "./contexts/AuthContext";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.headers["Accept"] = "application/json";
axios.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

  return config;
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
