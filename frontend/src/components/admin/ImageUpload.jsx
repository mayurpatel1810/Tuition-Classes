import { useState } from "react";
import fileService from "../../services/fileService";

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api").replace(/\/api$/, "");

export default function ImageUpload({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const res = await fileService.upload(file);
      onChange(res.data.data.url);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const previewSrc = value
    ? (value.startsWith("http") ? value : `${API_ORIGIN}${value}`)
    : null;

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: "0.85rem", marginBottom: 6, fontWeight: 500 }}>{label}</label>

      {previewSrc && (
        <img
          src={previewSrc}
          alt="preview"
          style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "var(--radius-sm)", marginBottom: 8, border: "1px solid var(--color-border)" }}
        />
      )}

      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFileSelect} disabled={uploading} />

      {uploading && <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: 4 }}>Uploading...</p>}
      {error && <p style={{ fontSize: "0.8rem", color: "var(--color-error)", marginTop: 4 }}>{error}</p>}
    </div>
  );
}
