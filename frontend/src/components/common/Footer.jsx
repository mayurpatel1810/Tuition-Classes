export default function Footer() {
  return (
    <footer style={{ background: "var(--color-primary)", color: "white", padding: "48px 0 24px" }}>
      <div className="container grid grid-3" style={{ marginBottom: 32 }}>
        <div>
          <h3 style={{ marginBottom: 12 }}>Bright Future Institute</h3>
          <p style={{ opacity: 0.85, fontSize: "0.9rem" }}>
            Empowering students to achieve academic excellence through dedicated mentorship.
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: 12 }}>Quick Links</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, opacity: 0.85, fontSize: "0.9rem" }}>
            <a href="/courses">Courses</a>
            <a href="/faculty">Faculty</a>
            <a href="/results">Results</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: 12 }}>Contact</h4>
          <p style={{ opacity: 0.85, fontSize: "0.9rem" }}>📍 123 Education Lane, Ahmedabad</p>
          <p style={{ opacity: 0.85, fontSize: "0.9rem" }}>📞 +91 98765 43210</p>
          <p style={{ opacity: 0.85, fontSize: "0.9rem" }}>✉️ info@brightfuture.edu</p>
        </div>
      </div>
      <div className="container" style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 20, textAlign: "center", fontSize: "0.85rem", opacity: 0.7 }}>
        © {new Date().getFullYear()} Bright Future Institute. All rights reserved.
      </div>
    </footer>
  );
}
