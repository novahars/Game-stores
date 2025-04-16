import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // pastikan pakai react-router-dom
import { useAuth } from "../../contexts/AuthContext";

const LoginRegisterModal = ({ onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[2000000000]">
      <div className="relative flex w-3/4 max-w-5xl bg-white rounded-lg overflow-hidden shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="w-1/2 p-8 flex flex-col justify-center">
          {activeTab === "login" ? (
            <LoginPanel
              switchToRegister={() => setActiveTab("register")}
              onLoginSuccess={onLoginSuccess}
            />
          ) : (
            <RegisterPanel
              switchToLogin={() => setActiveTab("login")}
              onRegisterSuccess={() => setActiveTab("login")}
            />
          )}
        </div>

        <div className="w-1/2 h-auto">
          <img
            src="/assets/login.jpg"
            alt="Login Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const LoginPanel = ({ switchToRegister, onLoginSuccess }) => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 🟢 Tambahkan state untuk email & password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (token) {
    return <Navigate to="/" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { email, password };

    try {
      const response = await axios.post("/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      setToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.error(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2 className="text-2xl font-bold mb-4 text-center">Masuk</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-500"
        />
      </div>
      
      <button
        type="submit"
        className="mb-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Loading..." : "Masuk"}
      </button>
      <p className="text-center">
        Belum punya akun?{" "}
        <button className="text-blue-600 font-bold" onClick={switchToRegister}>
          Daftar
        </button>
      </p>
    </form>
  );
};

const RegisterPanel = ({ switchToLogin, onRegisterSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { name, email, password };

    try {
      const response = await axios.post("/register", data, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Registrasi berhasil! Silakan login.");
      onRegisterSuccess(); // Kembali ke login setelah registrasi berhasil
    } catch (error) {
      console.error(error.response?.data);
      alert(
        "Registrasi gagal: " + error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2 className="text-2xl font-bold mb-4 text-center">Daftar</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Nama</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-500"
        />
      </div>
      <button
        type="submit"
        className="mb-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "Loading..." : "Daftar"}
      </button>
      <p className="text-center">
        Sudah punya akun?{" "}
        <button className="text-blue-600 font-bold" onClick={switchToLogin}>
          Masuk
        </button>
      </p>
    </form>
  );
};

export default LoginRegisterModal;
