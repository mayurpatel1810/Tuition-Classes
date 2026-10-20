import { resolveImageUrl } from "../../utils/imageUrl";

export default function TopperCard({ topper }) {
  return (
    <div style={{
      background: "var(--color-surface)", borderRadius: "var(--radius-lg)",
      overflow: "hidden", boxShadow: "var(--shadow-sm)", textAlign: "center",
      transition: "transform 0.2s ease, box-shadow 0.2s ease"
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
    >
      <img
        src={resolveImageUrl(topper.photoUrl) || "https://placehold.co/300x300?text=Photo"}
        alt={topper.studentName}
        style={{ width: "100%", height: 220, objectFit: "cover" }}
      />
      <div style={{ padding: 20 }}>
        <h4>{topper.studentName}</h4>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", margin: "4px 0" }}>
          {topper.className} · {topper.exam} {topper.year}
        </p>
        <p style={{ color: "var(--color-accent)", fontWeight: 700, fontSize: "1.4rem", margin: "8px 0" }}>
          {topper.percentage}%
        </p>
        {topper.rank && <p style={{ fontSize: "0.85rem" }}>Rank #{topper.rank}</p>}
        {topper.achievement && (
          <span style={{
            display: "inline-block", marginTop: 8, padding: "4px 12px",
            background: "var(--color-primary)", color: "white",
            borderRadius: "var(--radius-sm)", fontSize: "0.75rem"
          }}>
            {topper.achievement}
          </span>
        )}
      </div>
    </div>
  );
}
