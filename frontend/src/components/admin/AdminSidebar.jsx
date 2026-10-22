import { NavLink } from "react-router-dom";
import Logo from "../common/Logo";
import Icon from "../common/Icon";
import { useInstitute } from "../../context/InstituteContext";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/admin/toppers", label: "Toppers", icon: "🏆" },
  { to: "/admin/results", label: "Results", icon: "📄" },
  { to: "/admin/courses", label: "Courses", icon: "📚" },
  { to: "/admin/faculty", label: "Faculty", icon: "👩‍🏫" },
  { to: "/admin/gallery", label: "Gallery", icon: "🖼️" },
  { to: "/admin/announcements", label: "Announcements", icon: "📢" },
  { to: "/admin/enquiries", label: "Enquiries", icon: "✉️" },
  { to: "/admin/contact", label: "Institute Info", icon: "⚙️" },
];

export default function AdminSidebar({ open }) {
  const { info } = useInstitute();

  return (
    <aside className={`admin-sidebar ${open ? "open" : ""}`}>
      <div className="admin-brand">
        <Logo size={38} />
        <div>
          <div className="admin-brand-name">{info.instituteName}</div>
          <div className="admin-brand-sub">Admin Panel</div>
        </div>
      </div>

      <nav className="admin-nav">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? "active" : "")}>
            <span aria-hidden="true">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <a href="/" target="_blank" rel="noreferrer">
          <Icon name="external" size={14} /> View website
        </a>
      </div>
    </aside>
  );
}
