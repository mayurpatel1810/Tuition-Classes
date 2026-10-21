import api from "./api";

const resultService = {
  getAll: (filters = {}) => api.get("/results", { params: filters }),
  getById: (id) => api.get(`/results/${id}`),
  create: (data) => api.post("/results", data),
  update: (id, data) => api.put(`/results/${id}`, data),
  delete: (id) => api.delete(`/results/${id}`),
};

export default resultService;
