import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = Cookies.get("is_logged_in");
    if (isLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://social-media-task-backend-3.onrender.com/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        const isLoggedIn = true;
        Cookies.set("is_logged_in", isLoggedIn, { expires: 1 });
        navigate("/admin/dashboard");
      } else {
        setError(`Failed to login. ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Username = admin"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Password = password123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="submit-button">
          Login
        </button>
        {error && <p className="error">*{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
