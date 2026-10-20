import api from "./api";

const topperService = {
  getAll: () => api.get("/toppers"),
  getById: (id) => api.get(`/toppers/${id}`),
  create: (data) => api.post("/toppers", data),
  update: (id, data) => api.put(`/toppers/${id}`, data),
  delete: (id) => api.delete(`/toppers/${id}`),
};

export default topperService;
