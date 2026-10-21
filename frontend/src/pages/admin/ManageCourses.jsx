import AdminCrudPage from "../../components/admin/AdminCrudPage";
import courseService from "../../services/courseService";

export default function ManageCourses() {
  return (
    <AdminCrudPage
      title="Manage Courses"
      service={courseService}
      columns={[
        { key: "name", label: "Name" },
        { key: "className", label: "Class" },
        { key: "duration", label: "Duration" },
        { key: "fees", label: "Fees" },
        { key: "active", label: "Active", render: (r) => (r.active ? "Yes" : "No") },
      ]}
      fields={[
        { name: "name", label: "Course Name", required: true },
        { name: "description", label: "Description", as: "textarea" },
        { name: "className", label: "Class" },
        { name: "subjects", label: "Subjects (comma-separated)" },
        { name: "duration", label: "Duration" },
        { name: "fees", label: "Fees", type: "number" },
        { name: "imageUrl", label: "Course Image", as: "image" },
        { name: "active", label: "Active", as: "checkbox" },
      ]}
      emptyForm={{ name: "", description: "", className: "", subjects: "", duration: "", fees: "", imageUrl: "", active: true }}
    />
  );
}
