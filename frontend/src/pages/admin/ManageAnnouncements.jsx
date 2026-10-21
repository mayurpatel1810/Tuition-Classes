import AdminCrudPage from "../../components/admin/AdminCrudPage";
import announcementService from "../../services/announcementService";

export default function ManageAnnouncements() {
  return (
    <AdminCrudPage
      title="Manage Announcements"
      service={announcementService}
      columns={[
        { key: "title", label: "Title" },
        { key: "announcementDate", label: "Date" },
        { key: "important", label: "Important", render: (r) => (r.important ? "Yes" : "No") },
        { key: "active", label: "Active", render: (r) => (r.active ? "Yes" : "No") },
      ]}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", as: "textarea" },
        { name: "announcementDate", label: "Date", type: "date" },
        { name: "important", label: "Important", as: "checkbox" },
        { name: "active", label: "Active", as: "checkbox" },
      ]}
      emptyForm={{ title: "", description: "", announcementDate: "", important: false, active: true }}
    />
  );
}
