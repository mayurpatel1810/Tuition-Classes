import AdminCrudPage from "../../components/admin/AdminCrudPage";
import announcementService from "../../services/announcementService";

// The admin list must include INACTIVE announcements too — otherwise an announcement
// disappears from this page as soon as "Active" is unticked and can never be edited again.
const adminAnnouncementService = { ...announcementService, getAll: announcementService.getAllAdmin };

export default function ManageAnnouncements() {
  return (
    <AdminCrudPage
      title="Manage Announcements"
      service={adminAnnouncementService}
      columns={[
        { key: "title", label: "Title" },
        { key: "announcementDate", label: "Date" },
        { key: "important", label: "Important", render: (r) => (r.important ? "Yes" : "No") },
        { key: "active", label: "Shown on website", render: (r) => (r.active ? "Yes" : "No (hidden)") },
      ]}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", as: "textarea" },
        { name: "announcementDate", label: "Date", type: "date" },
        { name: "important", label: "Important", as: "checkbox" },
        { name: "active", label: "Active (show on website)", as: "checkbox" },
      ]}
      emptyForm={{ title: "", description: "", announcementDate: "", important: false, active: true }}
    />
  );
}
