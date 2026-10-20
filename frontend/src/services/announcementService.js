import api from "./api";

const announcementService = {
  getAll: () => api.get("/announcements"),
  create: (data) => api.post("/announcements", data),
  update: (id, data) => api.put(`/announcements/${id}`, data),
  delete: (id) => api.delete(`/announcements/${id}`),
};

export default announcementService;
