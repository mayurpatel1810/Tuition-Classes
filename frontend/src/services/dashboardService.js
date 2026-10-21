import topperService from "./topperService";
import courseService from "./courseService";
import facultyService from "./facultyService";
import resultService from "./resultService";
import enquiryService from "./enquiryService";
import announcementService from "./announcementService";

const dashboardService = {
  getStats: async () => {
    const [toppers, courses, faculty, results, enquiries, announcements] = await Promise.all([
      topperService.getAll(),
      courseService.getAll(),
      facultyService.getAll(),
      resultService.getAll(),
      enquiryService.getAll(),
      announcementService.getAll(),
    ]);
    return {
      toppers: toppers.data.data.length,
      courses: courses.data.data.length,
      faculty: faculty.data.data.length,
      results: results.data.data.length,
      enquiries: enquiries.data.data.length,
      announcements: announcements.data.data.length,
    };
  },
};

export default dashboardService;
