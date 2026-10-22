// Backend runs on port 8081 (see backend/src/main/resources/application.yml).
// Override with VITE_API_BASE_URL in frontend/.env when deploying.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api";

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

/**
 * - Full URLs are used as they are.
 * - "/uploads/..." are photos uploaded through the admin panel -> served by the backend.
 * - Any other path (e.g. "/images/courses/class10.svg") is a file bundled with the frontend.
 */
export function resolveImageUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  if (path.startsWith("/uploads/")) return `${API_ORIGIN}${path}`;
  return path;
}
