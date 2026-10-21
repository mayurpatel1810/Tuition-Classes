import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin/dashboard", label: "📊 Dashboard" },
  { to: "/admin/toppers", label: "🏆 Toppers" },
  { to: "/admin/results", label: "📄 Results" },
  { to: "/admin/courses", label: "📚 Courses" },
  { to: "/admin/faculty", label: "👩‍🏫 Faculty" },
  { to: "/admin/gallery", label: "🖼️ Gallery" },
  { to: "/admin/announcements", label: "📢 Announcements" },
  { to: "/admin/enquiries", label: "✉️ Enquiries" },
  { to: "/admin/contact", label: "⚙️ Institute Info" },
];

export default function AdminSidebar() {
  return (
    <aside style={{
      width: 240, background: "var(--color-primary)", color: "white",
      minHeight: "100vh", padding: "24px 16px", position: "sticky", top: 0
    }}>
      <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 32, padding: "0 8px" }}>
        Admin Panel
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              padding: "10px 12px", borderRadius: "var(--radius-sm)", fontSize: "0.9rem",
              background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
