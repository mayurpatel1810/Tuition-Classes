import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import usePageTitle from "../../hooks/usePageTitle";
import DataTable from "./DataTable";
import Modal from "./Modal";
import ConfirmDialog from "./ConfirmDialog";
import FormField from "./FormField";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

export default function AdminCrudPage({ title, service, columns, fields, emptyForm }) {
  usePageTitle(title);
  const { data: rows, loading, error, refetch } = useFetch(() => service.getAll());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const [pageMessage, setPageMessage] = useState(null);

  const openAddModal = () => {
    setPageMessage(null);
    setEditingRow(null);
    setFormData(emptyForm);
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    setEditingRow(row);
    setFormData({ ...emptyForm, ...row });
    setFormError(null);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    try {
      if (editingRow) {
        await service.update(editingRow.id, formData);
      } else {
        await service.create(formData);
      }
      setModalOpen(false);
      setPageMessage({ type: "success", text: editingRow ? "Record updated." : "Record added." });
      refetch();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to save. Please check the form and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(deleteTarget.id);
      setDeleteTarget(null);
      setPageMessage({ type: "success", text: "Record deleted." });
      refetch();
    } catch (err) {
      // Shown on the page (the old code put this inside the closed modal, so it was never visible)
      setPageMessage({ type: "error", text: err.response?.data?.message || "Failed to delete." });
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>{title}</h2>
        <button className="btn btn-primary" onClick={openAddModal}>+ Add New</button>
      </div>

      {pageMessage && (
        <div className={`notice ${pageMessage.type === "success" ? "notice-success" : "notice-error"}`} style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{pageMessage.text}</span>
          <button onClick={() => setPageMessage(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }} aria-label="Dismiss">✕</button>
        </div>
      )}

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && (
        <DataTable columns={columns} rows={rows || []} onEdit={openEditModal} onDelete={setDeleteTarget} />
      )}

      <Modal open={modalOpen} title={editingRow ? "Edit Record" : "Add New Record"} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          {fields.map((f) => (
            <FormField key={f.name} {...f} value={formData[f.name]} onChange={handleChange} />
          ))}
          {formError && <p style={{ color: "var(--color-error)", fontSize: "0.85rem", marginBottom: 12 }}>{formError}</p>}
          <button type="submit" className="btn btn-primary" disabled={saving} style={{ width: "100%" }}>
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this record?"
        message="This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
