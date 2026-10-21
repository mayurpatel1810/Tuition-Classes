import AdminCrudPage from "../../components/admin/AdminCrudPage";
import galleryService from "../../services/galleryService";

export default function ManageGallery() {
  return (
    <AdminCrudPage
      title="Manage Gallery"
      service={galleryService}
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
      ]}
      fields={[
        { name: "title", label: "Title" },
        { name: "description", label: "Description", as: "textarea" },
        { name: "imageUrl", label: "Gallery Image", as: "image", required: true },
        { name: "category", label: "Category" },
      ]}
      emptyForm={{ title: "", description: "", imageUrl: "", category: "" }}
    />
  );
}
