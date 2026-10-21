import AdminCrudPage from "../../components/admin/AdminCrudPage";
import facultyService from "../../services/facultyService";

export default function ManageFaculty() {
  return (
    <AdminCrudPage
      title="Manage Faculty"
      service={facultyService}
      columns={[
        { key: "name", label: "Name" },
        { key: "subject", label: "Subject" },
        { key: "qualification", label: "Qualification" },
        { key: "experience", label: "Experience" },
      ]}
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "subject", label: "Subject" },
        { name: "qualification", label: "Qualification" },
        { name: "experience", label: "Experience" },
        { name: "description", label: "Description", as: "textarea" },
        { name: "photoUrl", label: "Faculty Photo", as: "image" },
      ]}
      emptyForm={{ name: "", subject: "", qualification: "", experience: "", description: "", photoUrl: "" }}
    />
  );
}
