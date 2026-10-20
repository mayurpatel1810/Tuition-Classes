import { useState } from "react";
import enquiryService from "../../services/enquiryService";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: "" });
    try {
      await enquiryService.create(form);
      setStatus({ type: "success", message: "Thanks! Your enquiry has been submitted — we'll get back to you soon." });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container section">
      <h1 className="section-title">Contact Us</h1>
      <p className="section-subtitle">Have a question? Reach out and we'll respond as soon as possible.</p>

      <div className="grid grid-2">
        <div>
          <div style={infoCard}>
            <h4>📍 Address</h4>
            <p style={{ color: "var(--color-text-muted)" }}>123 Education Lane, Ahmedabad, Gujarat, India</p>
          </div>
          <div style={infoCard}>
            <h4>📞 Phone</h4>
            <p style={{ color: "var(--color-text-muted)" }}>+91 98765 43210</p>
          </div>
          <div style={infoCard}>
            <h4>✉️ Email</h4>
            <p style={{ color: "var(--color-text-muted)" }}>info@brightfuture.edu</p>
          </div>
          <div style={{ ...infoCard, height: 220, padding: 0, overflow: "hidden" }}>
            <iframe
              title="location"
              src="https://maps.google.com/maps?q=Ahmedabad&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ background: "var(--color-surface)", padding: 28, borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
          <h4 style={{ marginBottom: 16 }}>Send an Enquiry</h4>

          <FormField label="Name" name="name" value={form.name} onChange={handleChange} required />
          <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <FormField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          <FormField label="Message" name="message" as="textarea" value={form.message} onChange={handleChange} required />

          {status.type && (
            <p style={{
              color: status.type === "success" ? "var(--color-success)" : "var(--color-error)",
              marginBottom: 12, fontSize: "0.9rem"
            }}>
              {status.message}
            </p>
          )}

          <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: "100%" }}>
            {submitting ? "Sending..." : "Send Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}

function FormField({ label, name, value, onChange, type = "text", as = "input", required = false }) {
  const Tag = as;
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: "0.85rem", marginBottom: 6, fontWeight: 500 }}>{label}</label>
      <Tag
        name={name}
        type={as === "input" ? type : undefined}
        value={value}
        onChange={onChange}
        required={required}
        rows={as === "textarea" ? 4 : undefined}
        style={{
          width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)",
          border: "1px solid var(--color-border)", fontFamily: "inherit", fontSize: "0.9rem", resize: "vertical"
        }}
      />
    </div>
  );
}

const infoCard = {
  background: "var(--color-surface)", padding: 20, borderRadius: "var(--radius-md)",
  boxShadow: "var(--shadow-sm)", marginBottom: 16
};
