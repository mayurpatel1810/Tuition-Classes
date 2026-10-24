import topperService from "./topperService";
import courseService from "./courseService";
import facultyService from "./facultyService";
import resultService from "./resultService";
import enquiryService from "./enquiryService";
import announcementService from "./announcementService";
import galleryService from "./galleryService";

const sources = {
  toppers: () => topperService.getAll(),
  results: () => resultService.getAll(),
  courses: () => courseService.getAll(),
  faculty: () => facultyService.getAll(),
  gallery: () => galleryService.getAll(),
  announcements: () => announcementService.getAllAdmin(),
  enquiries: () => enquiryService.getAll(),
};

const dashboardService = {
  /**
   * Loads every section in parallel. Uses allSettled so one failing section
   * shows "—" on its card instead of breaking the whole dashboard.
   */
  getStats: async () => {
    const keys = Object.keys(sources);
    const settled = await Promise.allSettled(keys.map((k) => sources[k]()));

    const lists = {};
    const failed = [];
    settled.forEach((result, i) => {
      if (result.status === "fulfilled") {
        lists[keys[i]] = result.value.data?.data || [];
      } else {
        lists[keys[i]] = null;
        failed.push(keys[i]);
      }
    });

    // If everything failed it's a real problem (server down / logged out) — surface it.
    if (failed.length === keys.length) {
      throw settled[0].reason;
    }

    const count = (key) => (lists[key] ? lists[key].length : null);
    const enquiries = lists.enquiries || [];

    return {
      counts: {
        toppers: count("toppers"),
        results: count("results"),
        courses: count("courses"),
        faculty: count("faculty"),
        gallery: count("gallery"),
        announcements: count("announcements"),
        enquiries: count("enquiries"),
      },
      newEnquiries: lists.enquiries ? enquiries.filter((e) => e.status === "NEW").length : null,
      activeCourses: lists.courses ? lists.courses.filter((c) => c.active !== false).length : null,
      activeAnnouncements: lists.announcements ? lists.announcements.filter((a) => a.active !== false).length : null,
      recentEnquiries: enquiries.slice(0, 5),
      failed,
    };
  },
};

export default dashboardService;
