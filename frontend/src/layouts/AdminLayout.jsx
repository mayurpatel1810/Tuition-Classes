import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";
import "../components/admin/admin.css";

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu after navigating
  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <div className="admin-shell">
      <AdminSidebar open={menuOpen} />
      <div className={`admin-backdrop ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
      <div className="admin-main">
        <AdminNavbar onMenuClick={() => setMenuOpen((o) => !o)} />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
