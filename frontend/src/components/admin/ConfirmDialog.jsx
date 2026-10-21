export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={dialog}>
        <h4 style={{ marginBottom: 8 }}>{title}</h4>
        <p style={{ color: "var(--color-text-muted)", marginBottom: 24, fontSize: "0.9rem" }}>{message}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onCancel} className="btn" style={{ background: "var(--color-border)" }}>Cancel</button>
          <button onClick={onConfirm} className="btn" style={{ background: "var(--color-error)", color: "white" }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
};

const dialog = {
  background: "white", borderRadius: "var(--radius-md)", padding: 28,
  width: 360, boxShadow: "var(--shadow-lg)",
};
