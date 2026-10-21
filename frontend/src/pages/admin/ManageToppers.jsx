import AdminCrudPage from "../../components/admin/AdminCrudPage";
import topperService from "../../services/topperService";

export default function ManageToppers() {
  return (
    <AdminCrudPage
      title="Manage Toppers"
      service={topperService}
      columns={[
        { key: "studentName", label: "Name" },
        { key: "className", label: "Class" },
        { key: "percentage", label: "%" },
        { key: "year", label: "Year" },
        { key: "rank", label: "Rank" },
      ]}
      fields={[
        { name: "studentName", label: "Student Name", required: true },
        { name: "className", label: "Class", required: true },
        { name: "percentage", label: "Percentage", type: "number", required: true },
        { name: "rank", label: "Rank", type: "number" },
        { name: "exam", label: "Exam" },
        { name: "year", label: "Year", type: "number", required: true },
        { name: "achievement", label: "Achievement" },
        { name: "photoUrl", label: "Student Photo", as: "image" },
      ]}
      emptyForm={{ studentName: "", className: "", percentage: "", rank: "", exam: "", year: "", achievement: "", photoUrl: "" }}
    />
  );
}
