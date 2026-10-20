import api from "./api";

const enquiryService = {
  create: (data) => api.post("/enquiries", data),
  getAll: () => api.get("/enquiries"),
  updateStatus: (id, status) => api.patch(`/enquiries/${id}/status`, { status }),
};

export default enquiryService;
