import ImageUpload from "./ImageUpload";

export default function FormField({ label, name, value, onChange, type = "text", as = "input", required = false, options = null }) {
  const commonStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)",
    border: "1px solid var(--color-border)", fontFamily: "inherit", fontSize: "0.9rem",
  };

  if (as === "image") {
    return (
      <ImageUpload
        label={label}
        value={value}
        onChange={(url) => onChange({ target: { name, value: url } })}
      />
    );
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: "0.85rem", marginBottom: 6, fontWeight: 500 }}>
        {label}{required && " *"}
      </label>

      {as === "textarea" ? (
        <textarea name={name} value={value ?? ""} onChange={onChange} required={required} rows={4} style={{ ...commonStyle, resize: "vertical" }} />
      ) : as === "select" ? (
        <select name={name} value={value ?? ""} onChange={onChange} required={required} style={commonStyle}>
          <option value="">Select...</option>
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : as === "checkbox" ? (
        <input type="checkbox" name={name} checked={!!value} onChange={onChange} style={{ width: 18, height: 18 }} />
      ) : (
        <input type={type} name={name} value={value ?? ""} onChange={onChange} required={required} style={commonStyle} />
      )}
    </div>
  );
}
