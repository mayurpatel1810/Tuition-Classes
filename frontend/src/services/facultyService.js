import api from "./api";

const facultyService = {
  getAll: () => api.get("/faculty"),
  getById: (id) => api.get(`/faculty/${id}`),
  create: (data) => api.post("/faculty", data),
  update: (id, data) => api.put(`/faculty/${id}`, data),
  delete: (id) => api.delete(`/faculty/${id}`),
};

export default facultyService;
