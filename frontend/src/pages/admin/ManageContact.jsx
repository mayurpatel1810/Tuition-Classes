import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import instituteService from "../../services/instituteService";
import FormField from "../../components/admin/FormField";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

export default function ManageContact() {
  const { data, loading, error, refetch } = useFetch(() => instituteService.get());
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  if (loading || !form) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await instituteService.update(form);
      setStatus({ type: "success", message: "Institute information updated." });
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.message || "Failed to update." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Institute Information</h2>
      <form onSubmit={handleSubmit} style={{ background: "white", padding: 28, borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", maxWidth: 560 }}>
        <FormField label="Institute Name" name="instituteName" value={form.instituteName} onChange={handleChange} required />
        <FormField label="Tagline" name="tagline" value={form.tagline} onChange={handleChange} />
        <FormField label="Address" name="address" value={form.address} onChange={handleChange} as="textarea" />
        <FormField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <FormField label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
        <FormField label="About" name="about" value={form.about} onChange={handleChange} as="textarea" />
        <FormField label="Institute Logo" name="logoUrl" value={form.logoUrl} onChange={handleChange} as="image" />

        {status && (
          <p style={{ color: status.type === "success" ? "var(--color-success)" : "var(--color-error)", fontSize: "0.9rem", marginBottom: 12 }}>
            {status.message}
          </p>
        )}

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
