import api from "./api";

const announcementService = {
  // Public website: active announcements only
  getAll: () => api.get("/announcements"),
  // Admin panel: all announcements, including inactive ones (requires login)
  getAllAdmin: () => api.get("/announcements/all"),
  create: (data) => api.post("/announcements", data),
  update: (id, data) => api.put(`/announcements/${id}`, data),
  delete: (id) => api.delete(`/announcements/${id}`),
};

export default announcementService;
