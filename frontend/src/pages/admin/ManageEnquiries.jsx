import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import usePageTitle from "../../hooks/usePageTitle";
import enquiryService from "../../services/enquiryService";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import DataTable from "../../components/admin/DataTable";

const STATUSES = ["ALL", "NEW", "CONTACTED", "CLOSED"];

export default function ManageEnquiries() {
  usePageTitle("Enquiries");
  const { data: enquiries, loading, error, refetch } = useFetch(() => enquiryService.getAll());
  const [filter, setFilter] = useState("ALL");
  const [actionError, setActionError] = useState(null);

  const handleStatusChange = async (id, status) => {
    setActionError(null);
    try {
      await enquiryService.updateStatus(id, status);
      refetch();
    } catch (err) {
      setActionError(err.response?.data?.message || "Could not update the status. Please try again.");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  const all = enquiries || [];
  const countOf = (s) => (s === "ALL" ? all.length : all.filter((e) => e.status === s).length);
  const rows = filter === "ALL" ? all : all.filter((e) => e.status === filter);

  const columns = [
    {
      key: "createdAt",
      label: "Received",
      render: (r) => (r.createdAt ? new Date(r.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "-"),
    },
    { key: "name", label: "Name", render: (r) => <strong>{r.name}</strong> },
    { key: "email", label: "Email", render: (r) => <a href={`mailto:${r.email}`} style={{ color: "var(--color-primary)" }}>{r.email}</a> },
    { key: "phone", label: "Phone", render: (r) => (r.phone ? <a href={`tel:${r.phone}`} style={{ color: "var(--color-primary)" }}>{r.phone}</a> : "-") },
    { key: "message", label: "Message", render: (r) => <span style={{ display: "block", maxWidth: 320, whiteSpace: "pre-wrap" }}>{r.message}</span> },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <select
          value={r.status}
          onChange={(e) => handleStatusChange(r.id, e.target.value)}
          style={{ padding: "4px 8px", borderRadius: 4, border: "1px solid var(--color-border)" }}
        >
          <option value="NEW">NEW</option>
          <option value="CONTACTED">CONTACTED</option>
          <option value="CLOSED">CLOSED</option>
        </select>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <h2>Enquiries</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="btn"
              style={{
                padding: "6px 14px", fontSize: "0.82rem",
                background: filter === s ? "var(--color-primary)" : "white",
                color: filter === s ? "white" : "var(--color-text)",
                border: "1px solid var(--color-border)",
              }}
            >
              {s} ({countOf(s)})
            </button>
          ))}
        </div>
      </div>
      {actionError && <div className="notice notice-error">{actionError}</div>}
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
