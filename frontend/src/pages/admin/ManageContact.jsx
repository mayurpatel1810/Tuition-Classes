import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import usePageTitle from "../../hooks/usePageTitle";
import instituteService from "../../services/instituteService";
import { useInstitute } from "../../context/InstituteContext";
import FormField from "../../components/admin/FormField";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

const EMPTY = { instituteName: "", tagline: "", address: "", phone: "", email: "", about: "", logoUrl: "" };

export default function ManageContact() {
  usePageTitle("Institute Info");
  const { data, loading, error, refetch } = useFetch(() => instituteService.get());
  const { refresh: refreshSiteInfo } = useInstitute();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (data) setForm({ ...EMPTY, ...data });
  }, [data]);

  // Error must be checked BEFORE the "form not ready" spinner — previously a failed
  // request left this page spinning forever.
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!form) return <LoadingSpinner />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await instituteService.update(form);
      await refreshSiteInfo(); // header, footer & contact page update immediately
      setStatus({ type: "success", message: "Institute information updated. The website now shows these details." });
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.message || "Failed to update." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 6 }}>Institute Information</h2>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: 20 }}>
        These details appear in the website header, footer and Contact page. The logo is also used as the browser-tab icon.
      </p>
      <form onSubmit={handleSubmit} style={{ background: "white", padding: 28, borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", maxWidth: 620 }}>
        <FormField label="Institute Name" name="instituteName" value={form.instituteName} onChange={handleChange} required />
        <FormField label="Tagline" name="tagline" value={form.tagline} onChange={handleChange} />
        <FormField label="Address" name="address" value={form.address} onChange={handleChange} as="textarea" />
        <FormField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <FormField label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
        <FormField label="About (shown on the About page)" name="about" value={form.about} onChange={handleChange} as="textarea" />
        <FormField label="Institute Logo (square image works best)" name="logoUrl" value={form.logoUrl} onChange={handleChange} as="image" />
        {form.logoUrl && (
          <button type="button" onClick={() => setForm({ ...form, logoUrl: "" })} style={{ background: "none", border: "none", color: "var(--color-error)", cursor: "pointer", fontSize: "0.8rem", marginTop: -8, marginBottom: 16 }}>
            Remove logo (use default emblem)
          </button>
        )}

        {status && (
          <div className={`notice ${status.type === "success" ? "notice-success" : "notice-error"}`}>{status.message}</div>
        )}

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
