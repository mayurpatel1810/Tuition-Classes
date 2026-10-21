export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div style={overlay} onClick={onClose}>
      <div style={panel} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3>{title}</h3>
          <button onClick={onClose} style={closeBtn}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20,
};

const panel = {
  background: "white", borderRadius: "var(--radius-md)", padding: 28,
  width: "100%", maxWidth: 520, maxHeight: "85vh", overflowY: "auto", boxShadow: "var(--shadow-lg)",
};

const closeBtn = {
  background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "var(--color-text-muted)",
};
