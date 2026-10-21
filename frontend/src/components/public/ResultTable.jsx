export default function ResultTable({ results }) {
  return (
    <div style={{ overflowX: "auto", background: "var(--color-surface)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--color-primary)", color: "white", textAlign: "left" }}>
            {["Student", "Class", "Exam", "Year", "Percentage", "Rank", "Achievement"].map((h) => (
              <th key={h} style={{ padding: "14px 16px", fontSize: "0.85rem" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={cell}>{r.studentName}</td>
              <td style={cell}>{r.className}</td>
              <td style={cell}>{r.exam}</td>
              <td style={cell}>{r.year}</td>
              <td style={{ ...cell, fontWeight: 700, color: "var(--color-accent)" }}>{r.percentage}%</td>
              <td style={cell}>{r.rank ?? "-"}</td>
              <td style={cell}>{r.achievement ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cell = { padding: "12px 16px", fontSize: "0.9rem" };
