import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/authApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginAdmin(email, password);
      localStorage.setItem("adminToken", data.token);
      navigate("/select-language");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f5f5f5" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: 320,
          padding: 24,
          border: "1px solid #ddd",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          background: "white"
        }}
      >
        <h2 style={{ marginBottom: 16, textAlign: "center" }}>Admin Login</h2>
        {error && (
          <div style={{ color: "red", marginBottom: 12, fontSize: 14, padding: 8, background: "#ffe6e6", borderRadius: 4 }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: 500 }}>Email</label>
          <input
            style={{ width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 4, fontSize: 14 }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@admin.com"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: 500 }}>Password</label>
          <input
            style={{ width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 4, fontSize: 14 }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            marginTop: 8,
            backgroundColor: "#111827",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
