import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminNavbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header style={{
      height: 64, background: "white", borderBottom: "1px solid var(--color-border)",
      display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 28px", gap: 16
    }}>
      <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
        Logged in as <strong>{auth?.username}</strong>
      </span>
      <button onClick={handleLogout} className="btn" style={{ background: "var(--color-border)" }}>
        Logout
      </button>
    </header>
  );
}
