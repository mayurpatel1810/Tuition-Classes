export default function AnnouncementCard({ announcement }) {
  return (
    <div style={{
      background: "var(--color-surface)", borderRadius: "var(--radius-md)",
      padding: 20, boxShadow: "var(--shadow-sm)",
      borderLeft: `4px solid ${announcement.important ? "var(--color-accent)" : "var(--color-border)"}`
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <h4>{announcement.title}</h4>
        {announcement.important && (
          <span style={{ fontSize: "0.7rem", background: "var(--color-accent)", color: "white", padding: "2px 10px", borderRadius: 20 }}>
            IMPORTANT
          </span>
        )}
      </div>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", margin: "8px 0" }}>
        {announcement.description}
      </p>
      {announcement.announcementDate && (
        <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
          {new Date(announcement.announcementDate + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      )}
    </div>
  );
}
