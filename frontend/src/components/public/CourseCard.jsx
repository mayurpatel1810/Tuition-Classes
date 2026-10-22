import { resolveImageUrl } from "../../utils/imageUrl";

export default function CourseCard({ course }) {
  return (
    <div style={{
      background: "var(--color-surface)", borderRadius: "var(--radius-lg)",
      overflow: "hidden", boxShadow: "var(--shadow-sm)"
    }}>
      {course.imageUrl ? (
        <img
          src={resolveImageUrl(course.imageUrl)}
          alt={course.name}
          style={{ width: "100%", height: 180, objectFit: "cover" }}
        />
      ) : (
        <div style={{
          height: 180, display: "grid", placeItems: "center", padding: 20, textAlign: "center",
          background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
          color: "white", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1.1rem",
        }}>
          {course.name}
        </div>
      )}
      <div style={{ padding: 20 }}>
        <h4 style={{ marginBottom: 6 }}>{course.name}</h4>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: 12 }}>
          {course.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: "0.8rem", marginBottom: 12 }}>
          {course.className && <span style={badge}>{course.className}</span>}
          {course.duration && <span style={badge}>{course.duration}</span>}
        </div>
        {course.subjects && (
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: 12 }}>
            Subjects: {course.subjects}
          </p>
        )}
        {course.fees != null && (
          <p style={{ fontWeight: 700, color: "var(--color-primary)" }}>
            ₹{Number(course.fees).toLocaleString("en-IN")} <span style={{ fontWeight: 400, fontSize: "0.8rem", color: "var(--color-text-muted)" }}>total fees</span>
          </p>
        )}
      </div>
    </div>
  );
}

const badge = {
  background: "var(--color-bg)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-sm)",
  padding: "3px 10px",
};
