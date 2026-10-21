import useFetch from "../../hooks/useFetch";
import enquiryService from "../../services/enquiryService";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import DataTable from "../../components/admin/DataTable";

export default function ManageEnquiries() {
  const { data: enquiries, loading, error, refetch } = useFetch(() => enquiryService.getAll());

  const handleStatusChange = async (id, status) => {
    await enquiryService.updateStatus(id, status);
    refetch();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "message", label: "Message" },
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
      <h2 style={{ marginBottom: 20 }}>Enquiries</h2>
      <DataTable columns={columns} rows={enquiries || []} />
    </div>
  );
}
