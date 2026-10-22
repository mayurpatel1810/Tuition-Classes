import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Icon from "../common/Icon";

const titles = {
  "/admin/dashboard": "Dashboard",
  "/admin/toppers": "Toppers",
  "/admin/results": "Results",
  "/admin/courses": "Courses",
  "/admin/faculty": "Faculty",
  "/admin/gallery": "Gallery",
  "/admin/announcements": "Announcements",
  "/admin/enquiries": "Enquiries",
  "/admin/contact": "Institute Info",
};

export default function AdminNavbar({ onMenuClick }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="admin-topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button className="admin-menu-btn" onClick={onMenuClick} aria-label="Open menu">
          <Icon name="menu" size={20} />
        </button>
        <strong style={{ fontFamily: "var(--font-heading)" }}>{titles[pathname] || "Admin"}</strong>
      </div>

      <div className="admin-topbar-right">
        <span className="admin-hide-sm" style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
          Logged in as <strong style={{ color: "var(--color-text)" }}>{auth?.username}</strong>
        </span>
        <button onClick={handleLogout} className="btn" style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", padding: "8px 16px", gap: 8 }}>
          <Icon name="logout" size={15} /> Logout
        </button>
      </div>
    </header>
  );
}
