import usePageTitle from "../../hooks/usePageTitle";
import { useInstitute } from "../../context/InstituteContext";

export default function About() {
  usePageTitle("About Us");
  const { info } = useInstitute();

  return (
    <div className="container section">
      <h1 className="section-title">About Us</h1>
      <p className="section-subtitle" style={{ whiteSpace: "pre-line" }}>
        {info.about || `${info.instituteName} has been shaping academic success stories for over a decade.`}
      </p>

      <div className="grid grid-2" style={{ marginBottom: 48 }}>
        <div style={{ background: "var(--color-surface)", padding: 28, borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ marginBottom: 12 }}>Our Mission</h3>
          <p style={{ color: "var(--color-text-muted)" }}>
            To provide every student with the guidance, resources, and confidence they need to
            achieve their full academic potential — regardless of their starting point.
          </p>
        </div>
        <div style={{ background: "var(--color-surface)", padding: 28, borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ marginBottom: 12 }}>Our Vision</h3>
          <p style={{ color: "var(--color-text-muted)" }}>
            To be the most trusted name in academic coaching, known for producing not just
            top scorers, but confident, capable learners.
          </p>
        </div>
      </div>

      <h3 style={{ marginBottom: 12 }}>Our Teaching Methodology</h3>
      <p style={{ color: "var(--color-text-muted)", marginBottom: 32 }}>
        We combine concept-first teaching, regular practice tests, doubt-solving sessions, and
        continuous performance tracking — so students don't just memorize, they truly understand.
      </p>

      <h3 style={{ marginBottom: 12 }}>Experience & Achievements</h3>
      <div className="grid grid-3">
        {[
          { stat: "16+", label: "Years of Teaching" },
          { stat: "5000+", label: "Students Mentored" },
          { stat: "200+", label: "Students Above 90%" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center", padding: 24, background: "var(--color-surface)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-accent)" }}>{s.stat}</div>
            <div style={{ color: "var(--color-text-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
