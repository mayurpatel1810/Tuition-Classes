import AdminCrudPage from "../../components/admin/AdminCrudPage";
import resultService from "../../services/resultService";

export default function ManageResults() {
  return (
    <AdminCrudPage
      title="Manage Results"
      service={resultService}
      columns={[
        { key: "studentName", label: "Name" },
        { key: "className", label: "Class" },
        { key: "exam", label: "Exam" },
        { key: "percentage", label: "%" },
        { key: "year", label: "Year" },
      ]}
      fields={[
        { name: "studentName", label: "Student Name", required: true },
        { name: "className", label: "Class", required: true },
        { name: "exam", label: "Exam" },
        { name: "percentage", label: "Percentage", type: "number" },
        { name: "rank", label: "Rank", type: "number" },
        { name: "year", label: "Year", type: "number", required: true },
        { name: "achievement", label: "Achievement" },
      ]}
      emptyForm={{ studentName: "", className: "", exam: "", percentage: "", rank: "", year: "", achievement: "" }}
    />
  );
}
