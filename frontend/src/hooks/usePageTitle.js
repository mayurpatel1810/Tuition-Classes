import { useEffect } from "react";
import { useInstitute } from "../context/InstituteContext";

/** Sets the browser-tab title, e.g. "Courses | Bright Future Institute". */
export default function usePageTitle(pageTitle) {
  const { info } = useInstitute();

  useEffect(() => {
    document.title = pageTitle
      ? `${pageTitle} | ${info.instituteName}`
      : `${info.instituteName} | ${info.tagline || "Coaching & Tuition Classes"}`;
  }, [pageTitle, info.instituteName, info.tagline]);
}
