import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useInstitute } from "../../context/InstituteContext";
import usePageTitle from "../../hooks/usePageTitle";
import authService from "../../services/authService";
import Logo from "../../components/common/Logo";

export default function Login() {
  usePageTitle("Admin Login");
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { info } = useInstitute();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const sessionExpired = params.get("expired") === "1";

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await authService.login(form);
      login(res.data.data);
      navigate("/admin/dashboard");
    } catch (err) {
      if (!err.response) setError("Cannot reach the server. Please make sure the backend is running.");
      else setError(err.response?.data?.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "white", padding: 40, borderRadius: "var(--radius-lg)",
        width: "100%", maxWidth: 400, boxShadow: "var(--shadow-lg)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <Logo size={48} />
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--color-primary)" }}>{info.instituteName}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Administration</div>
          </div>
        </div>

        <h2 style={{ marginBottom: 6 }}>Admin Login</h2>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: 24 }}>
          Sign in to manage your institute's website.
        </p>

        {sessionExpired && !error && (
          <p style={{ background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", padding: "10px 12px", borderRadius: 6, fontSize: "0.85rem", marginBottom: 16 }}>
            Your session has expired. Please sign in again.
          </p>
        )}

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="username" style={labelStyle}>Username</label>
          <input
            id="username"
            autoComplete="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label htmlFor="password" style={labelStyle}>Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
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

        <p style={{ textAlign: "center", marginTop: 20, fontSize: "0.85rem" }}>
          <Link to="/" style={{ color: "var(--color-text-muted)" }}>← Back to website</Link>
        </p>
      </form>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: "0.85rem", marginBottom: 6, fontWeight: 500 };

const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-border)", fontSize: "0.9rem",
};
