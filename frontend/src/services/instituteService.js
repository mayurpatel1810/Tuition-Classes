import api from "./api";

const instituteService = {
  get: () => api.get("/institute-info"),
  update: (data) => api.put("/institute-info", data),
};

export default instituteService;
