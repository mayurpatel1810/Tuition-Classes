import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import usePageTitle from "../../hooks/usePageTitle";
import dashboardService from "../../services/dashboardService";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

const display = (value) => (value === null || value === undefined ? "—" : value);

export default function Dashboard() {
  usePageTitle("Admin Dashboard");
  const { auth } = useAuth();
  const { data: stats, loading, error, refetch } = useFetch(() => dashboardService.getStats());

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!stats) return null;

  const { counts } = stats;

  const cards = [
    { label: "Enquiries", value: counts.enquiries, icon: "✉️", to: "/admin/enquiries",
      note: stats.newEnquiries ? `${stats.newEnquiries} new` : null },
    { label: "Toppers", value: counts.toppers, icon: "🏆", to: "/admin/toppers" },
    { label: "Results", value: counts.results, icon: "📄", to: "/admin/results" },
    { label: "Courses", value: counts.courses, icon: "📚", to: "/admin/courses",
      note: stats.activeCourses !== null && stats.activeCourses !== counts.courses ? `${stats.activeCourses} active` : null },
    { label: "Faculty", value: counts.faculty, icon: "👩‍🏫", to: "/admin/faculty" },
    { label: "Gallery Photos", value: counts.gallery, icon: "🖼️", to: "/admin/gallery" },
    { label: "Announcements", value: counts.announcements, icon: "📢", to: "/admin/announcements",
      note: stats.activeAnnouncements !== null && stats.activeAnnouncements !== counts.announcements ? `${stats.activeAnnouncements} live` : null },
  ];

  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div>
      <div className="dash-header">
        <div>
          <h2>Welcome back{auth?.username ? `, ${auth.username}` : ""}</h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>{today}</p>
        </div>
        <button className="btn" onClick={refetch} style={{ background: "white", border: "1px solid var(--color-border)", padding: "8px 16px" }}>
          ↻ Refresh
        </button>
      </div>

      {stats.failed.length > 0 && (
        <div className="notice notice-warn">
          Some sections could not be loaded ({stats.failed.join(", ")}). Their cards show “—”. Click Refresh to try again.
        </div>
      )}

      <div className="dash-grid">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="stat-card">
            <div className="stat-card-top">
              <span className="stat-icon" aria-hidden="true">{c.icon}</span>
              {c.note && <span className="stat-note">{c.note}</span>}
            </div>
            <div className="stat-value">{display(c.value)}</div>
            <div className="stat-label">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="dash-panels">
        <section className="panel">
          <div className="panel-title">
            <h3 style={{ fontSize: "1.05rem" }}>Latest Enquiries</h3>
            <Link to="/admin/enquiries">View all →</Link>
          </div>
          {stats.recentEnquiries.length === 0 ? (
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", padding: "12px 0" }}>No enquiries yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ textAlign: "left", color: "var(--color-text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>
                    <th style={cell}>Name</th>
                    <th style={cell}>Contact</th>
                    <th style={cell}>Received</th>
                    <th style={cell}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentEnquiries.map((e) => (
                    <tr key={e.id} style={{ borderTop: "1px solid var(--color-border)" }}>
                      <td style={cell}><strong>{e.name}</strong></td>
                      <td style={cell}>{e.phone || e.email}</td>
                      <td style={cell}>{e.createdAt ? new Date(e.createdAt).toLocaleDateString("en-IN") : "-"}</td>
                      <td style={cell}><span className={`status-pill status-${e.status}`}>{e.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="panel">
          <div className="panel-title">
            <h3 style={{ fontSize: "1.05rem" }}>Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <Link to="/admin/toppers">🏆 Add a topper</Link>
            <Link to="/admin/results">📄 Publish results</Link>
            <Link to="/admin/announcements">📢 Post an announcement</Link>
            <Link to="/admin/gallery">🖼️ Upload gallery photos</Link>
            <Link to="/admin/contact">⚙️ Update institute info &amp; logo</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

const cell = { padding: "10px 8px" };
