// Shown when a topper or faculty member has no photo yet: initials on a coloured background.
const palette = ["#1e3a5f", "#2c5282", "#b45309", "#047857", "#7c3aed", "#be185d", "#0f766e", "#9a3412"];

function initials(name = "") {
  const parts = name.replace(/^(Dr|Mr|Mrs|Ms|Prof)\.?\s+/i, "").trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

function colourFor(name = "") {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return palette[hash % palette.length];
}

export default function Avatar({ name, height = 220 }) {
  const bg = colourFor(name);
  return (
    <div
      role="img"
      aria-label={name}
      style={{
        height,
        display: "grid",
        placeItems: "center",
        background: `linear-gradient(135deg, ${bg}, ${bg}cc)`,
      }}
    >
      <span style={{
        width: 110, height: 110, borderRadius: "50%", display: "grid", placeItems: "center",
        background: "rgba(255,255,255,0.18)", border: "3px solid rgba(255,255,255,0.55)",
        color: "white", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "2.4rem", letterSpacing: "0.02em",
      }}>
        {initials(name)}
      </span>
    </div>
  );
}
