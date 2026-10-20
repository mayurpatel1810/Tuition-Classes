import { resolveImageUrl } from "../../utils/imageUrl";

export default function FacultyCard({ faculty }) {
  return (
    <div style={{
      background: "var(--color-surface)", borderRadius: "var(--radius-lg)",
      overflow: "hidden", boxShadow: "var(--shadow-sm)", textAlign: "center"
    }}>
      <img
        src={resolveImageUrl(faculty.photoUrl) || "https://placehold.co/300x300?text=Faculty"}
        alt={faculty.name}
        style={{ width: "100%", height: 220, objectFit: "cover" }}
      />
      <div style={{ padding: 20 }}>
        <h4>{faculty.name}</h4>
        <p style={{ color: "var(--color-accent)", fontWeight: 600, margin: "4px 0" }}>{faculty.subject}</p>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{faculty.qualification}</p>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{faculty.experience} experience</p>
        {faculty.description && (
          <p style={{ fontSize: "0.85rem", marginTop: 8 }}>{faculty.description}</p>
        )}
      </div>
    </div>
  );
}
