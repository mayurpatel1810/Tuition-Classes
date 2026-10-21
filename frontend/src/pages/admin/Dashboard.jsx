import useFetch from "../../hooks/useFetch";
import dashboardService from "../../services/dashboardService";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

export default function Dashboard() {
  const { data: stats, loading, error, refetch } = useFetch(() => dashboardService.getStats());

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  const cards = [
    { label: "Total Toppers", value: stats.toppers, icon: "🏆" },
    { label: "Total Courses", value: stats.courses, icon: "📚" },
    { label: "Total Faculty", value: stats.faculty, icon: "👩‍🏫" },
    { label: "Total Results", value: stats.results, icon: "📄" },
    { label: "Total Enquiries", value: stats.enquiries, icon: "✉️" },
    { label: "Total Announcements", value: stats.announcements, icon: "📢" },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Dashboard</h2>
      <div className="grid grid-3">
        {cards.map((c) => (
          <div key={c.label} style={{ background: "white", borderRadius: "var(--radius-md)", padding: 24, boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{c.icon}</div>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-primary)" }}>{c.value}</div>
            <div style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
