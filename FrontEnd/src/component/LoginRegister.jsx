import React, { useState } from "react";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Mohon isi email dan password!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed!");
      }

      const data = await response.json();
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      alert("Login berhasil!");
      onLoginSuccess(data.user);
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message || "Terjadi kesalahan saat login.");
    }
    setLoading(false);
  };

  return (
    <>
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
        className="mb-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        onClick={handleLogin}
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
    </>
  );
};

const RegisterPanel = ({ switchToLogin, onRegisterSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed!");
      }

      const data = await response.json();
      alert("Registration successful! Please log in.");
      onRegisterSuccess();
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.message || "An error occurred during registration.");
    }
    setLoading(false);
  };

  return (
    <>
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
        className="mb-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        onClick={handleRegister}
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
    </>
  );
};

export default LoginRegisterModal;