import axios from "axios";
import { API_BASE_URL } from "../utils/imageUrl";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const AUTH_KEYS = ["adminToken", "adminUsername", "adminRole"];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// When the admin's login token expires (after 24h) every admin request fails with 401/403.
// Previously the dashboard just showed "Something went wrong". Now we clear the old token
// and send the admin back to the login page with a clear message.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";
    const hadToken = !!localStorage.getItem("adminToken");

    if (hadToken && (status === 401 || status === 403) && !url.includes("/auth/login")) {
      AUTH_KEYS.forEach((key) => localStorage.removeItem(key));
      if (window.location.pathname.startsWith("/admin") && !window.location.pathname.startsWith("/admin/login")) {
        window.location.assign("/admin/login?expired=1");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
