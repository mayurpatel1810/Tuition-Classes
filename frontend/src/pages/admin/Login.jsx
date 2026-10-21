import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await authService.login(form);
      login(res.data.data);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--color-primary)"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "white", padding: 40, borderRadius: "var(--radius-lg)",
        width: "100%", maxWidth: 380, boxShadow: "var(--shadow-lg)"
      }}>
        <h2 style={{ marginBottom: 6 }}>Admin Login</h2>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: 24 }}>
          Sign in to manage your institute's website.
        </p>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: 6 }}>Username</label>
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: 6 }}>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            style={inputStyle}
          />
        </div>

        {error && <p style={{ color: "var(--color-error)", fontSize: "0.85rem", marginBottom: 16 }}>{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-border)", fontSize: "0.9rem",
};
