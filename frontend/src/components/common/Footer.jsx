import { Link } from "react-router-dom";
import { useInstitute } from "../../context/InstituteContext";
import Logo from "./Logo";
import Icon from "./Icon";

const telHref = (phone) => `tel:${String(phone).replace(/[^\d+]/g, "")}`;

export default function Footer() {
  const { info } = useInstitute();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <Logo size={46} />
            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "white", fontSize: "1.1rem" }}>{info.instituteName}</div>
              {info.tagline && <div style={{ fontSize: "0.78rem", color: "var(--color-accent-light)" }}>{info.tagline}</div>}
            </div>
          </div>
          <p style={{ fontSize: "0.9rem", opacity: 0.85 }}>
            Empowering students to achieve academic excellence through dedicated mentorship, structured courses and personal attention.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <nav className="footer-links">
            <Link to="/about">About Us</Link>
            <Link to="/announcements">Announcements</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/contact">Admissions &amp; Contact</Link>
          </nav>
        </div>

        <div>
          <h4>Academics</h4>
          <nav className="footer-links">
            <Link to="/courses">Courses</Link>
            <Link to="/faculty">Faculty</Link>
            <Link to="/toppers">Our Toppers</Link>
            <Link to="/results">Results</Link>
          </nav>
        </div>

        <div>
          <h4>Contact Us</h4>
          <div className="footer-contact">
            {info.address && <span><Icon name="pin" /> {info.address}</span>}
            {info.phone && <a href={telHref(info.phone)}><Icon name="phone" /> {info.phone}</a>}
            {info.email && <a href={`mailto:${info.email}`}><Icon name="mail" /> {info.email}</a>}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {year} {info.instituteName}. All rights reserved.</span>
          <Link to="/admin/login">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
