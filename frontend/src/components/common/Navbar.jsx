import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useInstitute } from "../../context/InstituteContext";
import Logo from "./Logo";
import Icon from "./Icon";
import "./navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/faculty", label: "Faculty" },
  { to: "/toppers", label: "Toppers" },
  { to: "/results", label: "Results" },
  { to: "/gallery", label: "Gallery" },
  { to: "/announcements", label: "Announcements" },
  { to: "/contact", label: "Contact" },
];

const telHref = (phone) => `tel:${String(phone).replace(/[^\d+]/g, "")}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { info } = useInstitute();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Top information strip — like most official institute websites */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-contacts">
            {info.phone && (
              <a href={telHref(info.phone)}>
                <Icon name="phone" size={14} /> {info.phone}
              </a>
            )}
            {info.email && (
              <a href={`mailto:${info.email}`} className="topbar-hide-sm">
                <Icon name="mail" size={14} /> {info.email}
              </a>
            )}
            {info.address && (
              <span className="topbar-hide-sm" style={{ opacity: 0.85 }}>
                <Icon name="pin" size={14} /> {info.address.split(",").slice(-3).join(",").trim()}
              </span>
            )}
          </div>
          <Link to="/contact" className="topbar-cta">
            <span className="topbar-dot" aria-hidden="true" />
            Admission Enquiry<span className="topbar-cta-text-long">&nbsp;→</span>
          </Link>
        </div>
      </div>

      <header className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand" aria-label={`${info.instituteName} — Home`}>
            <Logo size={50} />
            <span className="navbar-brand-text">
              <span className="navbar-brand-name">{info.instituteName}</span>
              {info.tagline && <span className="navbar-brand-tagline">{info.tagline}</span>}
            </span>
          </Link>

          <button className="navbar-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>

          <nav className={`navbar-links ${open ? "open" : ""}`} aria-label="Main">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
