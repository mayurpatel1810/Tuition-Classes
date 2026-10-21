export default function DataTable({ columns, rows, onEdit, onDelete }) {
  if (!rows.length) {
    return <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-muted)" }}>No records yet.</div>;
  }

  const showActions = onEdit || onDelete;

  return (
    <div style={{ overflowX: "auto", background: "white", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--color-bg)", textAlign: "left" }}>
            {columns.map((col) => <th key={col.key} style={th}>{col.label}</th>)}
            {showActions && <th style={th}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
              {columns.map((col) => (
                <td key={col.key} style={td}>{col.render ? col.render(row) : row[col.key] ?? "-"}</td>
              ))}
              {showActions && (
                <td style={{ ...td, display: "flex", gap: 8 }}>
                  {onEdit && <button onClick={() => onEdit(row)} style={actionBtn}>Edit</button>}
                  {onDelete && <button onClick={() => onDelete(row)} style={{ ...actionBtn, color: "var(--color-error)" }}>Delete</button>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = { padding: "12px 16px", fontSize: "0.8rem", textTransform: "uppercase", color: "var(--color-text-muted)" };
const td = { padding: "12px 16px", fontSize: "0.9rem" };
const actionBtn = { background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", color: "var(--color-primary)" };
