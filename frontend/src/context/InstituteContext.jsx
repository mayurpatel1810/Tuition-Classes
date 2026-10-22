import { createContext, useCallback, useContext, useEffect, useState } from "react";
import instituteService from "../services/instituteService";
import { resolveImageUrl } from "../utils/imageUrl";

// Shown until the backend responds (or if it is unreachable), so the header/footer never look empty.
export const DEFAULT_INSTITUTE = {
  instituteName: "Bright Future Institute",
  tagline: "Excellence in Education, Since 2010",
  address: "204, Second Floor, Shreeji Complex, Near Vijay Cross Roads, Navrangpura, Ahmedabad, Gujarat 380009",
  phone: "+91 98765 43210",
  email: "info@brightfuture.edu",
  about: "",
  logoUrl: "",
};

const InstituteContext = createContext({ info: DEFAULT_INSTITUTE, refresh: () => {} });

function mergeWithDefaults(data) {
  const merged = { ...DEFAULT_INSTITUTE };
  Object.entries(data || {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && String(value).trim() !== "") merged[key] = value;
  });
  return merged;
}

export function InstituteProvider({ children }) {
  const [info, setInfo] = useState(DEFAULT_INSTITUTE);

  const refresh = useCallback(async () => {
    try {
      const res = await instituteService.get();
      setInfo(mergeWithDefaults(res.data?.data));
    } catch {
      // Keep defaults — the public site still renders if the API is down.
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // If the admin uploads a logo, use it as the browser-tab icon too.
  useEffect(() => {
    const link = document.querySelector("link[rel='icon']");
    if (!link) return;
    if (info.logoUrl) {
      link.removeAttribute("type");
      link.href = resolveImageUrl(info.logoUrl);
    } else {
      link.type = "image/svg+xml";
      link.href = "/favicon.svg";
    }
  }, [info.logoUrl]);

  return <InstituteContext.Provider value={{ info, refresh }}>{children}</InstituteContext.Provider>;
}

export function useInstitute() {
  return useContext(InstituteContext);
}
