import api from "./api";

const galleryService = {
  getAll: (category) => api.get("/gallery", { params: category ? { category } : {} }),
  create: (data) => api.post("/gallery", data),
  update: (id, data) => api.put(`/gallery/${id}`, data),
  delete: (id) => api.delete(`/gallery/${id}`),
};

export default galleryService;
