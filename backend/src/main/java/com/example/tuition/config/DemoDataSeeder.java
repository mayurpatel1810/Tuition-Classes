package com.example.tuition.config;

import com.example.tuition.entity.*;
import com.example.tuition.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Loads sample website content so the site looks complete on a fresh database.
 *
 * Controlled by app.demo-data in application.yml:
 *   if-empty (default) - fills only the sections that are still empty; never touches existing data
 *   reset              - deletes all website content and enquiries, then loads the sample data again
 *   off                - does nothing
 *
 * Images point to files bundled with the frontend (frontend/public/images/...).
 * The admin can replace any of this from the admin panel.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DemoDataSeeder implements CommandLineRunner {

    private final InstituteInformationRepository instituteRepository;
    private final CourseRepository courseRepository;
    private final FacultyRepository facultyRepository;
    private final TopperRepository topperRepository;
    private final ResultRepository resultRepository;
    private final AnnouncementRepository announcementRepository;
    private final GalleryRepository galleryRepository;
    private final EnquiryRepository enquiryRepository;

    @Value("${app.demo-data:if-empty}")
    private String mode;

    @Override
    public void run(String... args) {
        String m = mode == null ? "if-empty" : mode.trim().toLowerCase();
        if (m.equals("off") || m.equals("false")) {
            return;
        }
        if (m.equals("reset")) {
            log.warn("app.demo-data=reset -> removing existing website content and enquiries");
            galleryRepository.deleteAllInBatch();
            announcementRepository.deleteAllInBatch();
            resultRepository.deleteAllInBatch();
            topperRepository.deleteAllInBatch();
            facultyRepository.deleteAllInBatch();
            courseRepository.deleteAllInBatch();
            enquiryRepository.deleteAllInBatch();
            instituteRepository.deleteAllInBatch();
        }

        if (instituteRepository.count() == 0) seedInstituteInfo();
        if (courseRepository.count() == 0) seedCourses();
        if (facultyRepository.count() == 0) seedFaculty();
        if (topperRepository.count() == 0) seedToppers();
        if (resultRepository.count() == 0) seedResults();
        if (announcementRepository.count() == 0) seedAnnouncements();
        if (galleryRepository.count() == 0) seedGallery();
        if (enquiryRepository.count() == 0) seedEnquiries();
    }

    private void seedInstituteInfo() {
        instituteRepository.save(InstituteInformation.builder()
                .instituteName("Bright Future Institute")
                .tagline("Excellence in Education, Since 2010")
                .address("204, Second Floor, Shreeji Complex, Near Vijay Cross Roads, Navrangpura, Ahmedabad, Gujarat 380009")
                .phone("+91 98765 43210")
                .email("info@brightfuture.edu")
                .about("Bright Future Institute was started in 2010 by a group of teachers who believed every student can score well "
                        + "with the right guidance. Today we coach students from Class 8 to Class 12 for GSEB and CBSE boards, "
                        + "and prepare Science students for JEE Main, NEET and GUJCET.\n\n"
                        + "Batches are kept small (25-30 students) so that every student gets personal attention, regular tests "
                        + "and a clear plan to improve.")
                .build());
    }

    private void seedCourses() {
        courseRepository.saveAll(List.of(
                course("Foundation Batch (Class 8 & 9)", "Class 8-9",
                        "Builds strong basics in Maths and Science with weekly tests, so students enter Class 10 confident.",
                        "Maths, Science, English", "1 year (June - March)", 18000, "/images/courses/foundation.svg"),
                course("Class 10 Board Excellence (GSEB & CBSE)", "Class 10",
                        "Complete board syllabus with chapter-wise tests, previous-year papers and two full-length prelims before the board exam.",
                        "Maths, Science, Social Science, English", "1 year (April - March)", 28000, "/images/courses/class10.svg"),
                course("Class 11-12 Science (PCM)", "Class 11-12",
                        "Board preparation together with JEE Main and GUJCET practice: concept classes, DPPs and fortnightly tests.",
                        "Physics, Chemistry, Maths", "2 years", 55000, "/images/courses/science-pcm.svg"),
                course("Class 11-12 Science (PCB) with NEET", "Class 11-12",
                        "Board syllabus plus NEET-pattern MCQ practice, NCERT line-by-line revision and monthly full mock tests.",
                        "Physics, Chemistry, Biology", "2 years", 58000, "/images/courses/science-pcb.svg"),
                course("Class 11-12 Commerce", "Class 11-12",
                        "Concept-first teaching of Accounts and Economics with solved board papers and regular writing practice.",
                        "Accountancy, Economics, Statistics, Business Studies", "2 years", 36000, "/images/courses/commerce.svg"),
                course("JEE Main Crash Course", "Class 12 / Repeaters",
                        "Fast revision of the full JEE Main syllabus with 20 full-length mock tests and detailed paper analysis.",
                        "Physics, Chemistry, Maths", "4 months (December - April)", 22000, "/images/courses/jee-crash.svg")
        ));
    }

    private Course course(String name, String className, String description, String subjects,
                          String duration, int fees, String imageUrl) {
        return Course.builder().name(name).className(className).description(description).subjects(subjects)
                .duration(duration).fees(BigDecimal.valueOf(fees)).imageUrl(imageUrl).active(true).build();
    }

    private void seedFaculty() {
        facultyRepository.saveAll(List.of(
                faculty("Rajesh Patel", "Mathematics", "M.Sc. Mathematics, B.Ed.", "16 years",
                        "Head of Mathematics. Known for short methods and neat, step-by-step board answers."),
                faculty("Dr. Meera Shah", "Chemistry", "Ph.D. Chemistry", "12 years",
                        "Makes organic chemistry easy with reaction maps and daily practice sheets."),
                faculty("Amit Trivedi", "Physics", "M.Sc. Physics", "10 years",
                        "Teaches Physics through experiments and numericals for boards and JEE."),
                faculty("Neha Desai", "Biology", "M.Sc. Zoology, B.Ed.", "9 years",
                        "NEET mentor; focuses on NCERT-based concepts and diagram practice."),
                faculty("Kunal Joshi", "Accountancy & Economics", "M.Com.", "8 years",
                        "Guides Commerce students with case-based examples and solved board papers."),
                faculty("Priya Mehta", "English", "M.A. English, B.Ed.", "7 years",
                        "Helps students write better answers, letters and essays for board exams.")
        ));
    }

    private Faculty faculty(String name, String subject, String qualification, String experience, String description) {
        return Faculty.builder().name(name).subject(subject).qualification(qualification)
                .experience(experience).description(description).build();
    }

    private void seedToppers() {
        topperRepository.saveAll(List.of(
                topper("Aarya Patel", "Class 10", "GSEB SSC", 2026, "98.83", 1, "School first, 100/100 in Maths"),
                topper("Vivaan Shah", "Class 10", "CBSE Class X", 2026, "97.40", 2, "A1 grade in all subjects"),
                topper("Krisha Desai", "Class 12 Science", "GSEB HSC", 2026, "96.15", 1, "100/100 in Chemistry"),
                topper("Om Trivedi", "Class 12 Science", "CBSE Class XII", 2026, "95.20", 2, "99.1 percentile in JEE Main"),
                topper("Diya Joshi", "Class 12 Commerce", "GSEB HSC", 2026, "94.71", 1, "100/100 in Accountancy"),
                topper("Hetvi Parikh", "Class 10", "GSEB SSC", 2025, "97.67", 1, "99.9 percentile rank"),
                topper("Yash Bhatt", "Class 12 Science", "GSEB HSC", 2025, "95.38", 1, "Selected for B.Tech at NIT"),
                topper("Nisha Rana", "Class 12 Commerce", "CBSE Class XII", 2025, "93.80", 1, "Top scorer in Economics")
        ));
    }

    private Topper topper(String name, String className, String exam, int year, String percentage, int rank, String achievement) {
        return Topper.builder().studentName(name).className(className).exam(exam).year(year)
                .percentage(new BigDecimal(percentage)).rank(rank).achievement(achievement).build();
    }

    private void seedResults() {
        resultRepository.saveAll(List.of(
                result("Aarya Patel", "Class 10", "GSEB SSC", 2026, "98.83", 1, "School first"),
                result("Vivaan Shah", "Class 10", "CBSE Class X", 2026, "97.40", 2, "A1 in all subjects"),
                result("Jiya Thakkar", "Class 10", "GSEB SSC", 2026, "93.50", 3, null),
                result("Rudra Chauhan", "Class 10", "GSEB SSC", 2026, "88.17", null, null),
                result("Manan Soni", "Class 10", "CBSE Class X", 2026, "84.60", null, null),
                result("Krisha Desai", "Class 12 Science", "GSEB HSC", 2026, "96.15", 1, "100/100 in Chemistry"),
                result("Om Trivedi", "Class 12 Science", "CBSE Class XII", 2026, "95.20", 2, "JEE Main 99.1 percentile"),
                result("Dhruv Panchal", "Class 12 Science", "GSEB HSC", 2026, "89.40", null, null),
                result("Diya Joshi", "Class 12 Commerce", "GSEB HSC", 2026, "94.71", 1, "100/100 in Accountancy"),
                result("Tanvi Vora", "Class 12 Commerce", "GSEB HSC", 2026, "90.28", 2, null),
                result("Hetvi Parikh", "Class 10", "GSEB SSC", 2025, "97.67", 1, "99.9 percentile rank"),
                result("Arjun Rathod", "Class 10", "GSEB SSC", 2025, "91.33", 2, null),
                result("Sneh Kapadia", "Class 10", "CBSE Class X", 2025, "86.20", null, null),
                result("Yash Bhatt", "Class 12 Science", "GSEB HSC", 2025, "95.38", 1, "Selected for B.Tech at NIT"),
                result("Mahi Gandhi", "Class 12 Science", "GSEB HSC", 2025, "88.92", null, null),
                result("Nisha Rana", "Class 12 Commerce", "CBSE Class XII", 2025, "93.80", 1, "Top scorer in Economics")
        ));
    }

    private Result result(String name, String className, String exam, int year, String percentage, Integer rank, String achievement) {
        return Result.builder().studentName(name).className(className).exam(exam).year(year)
                .percentage(new BigDecimal(percentage)).rank(rank).achievement(achievement).build();
    }

    private void seedAnnouncements() {
        announcementRepository.saveAll(List.of(
                announcement("Admissions open for 2027-28 batches", LocalDate.of(2026, 10, 5), true,
                        "Registration is open for the Foundation, Class 10 and Class 11-12 batches starting April 2027. "
                                + "Visit the institute or send an enquiry to book a free counselling session."),
                announcement("Class 12 board mock test series", LocalDate.of(2026, 10, 8), true,
                        "Full-length mock tests every Sunday from 15 November 2026 for Physics, Chemistry, Maths, Biology and Accountancy. "
                                + "Paper discussion is held the following Tuesday."),
                announcement("Parent-teacher meeting on Sunday, 25 October 2026", LocalDate.of(2026, 10, 3), false,
                        "From 10:00 AM to 1:00 PM at the institute. First unit test progress reports will be shared with parents."),
                announcement("Free doubt-solving sessions every Saturday", LocalDate.of(2026, 9, 20), false,
                        "4:00 to 6:00 PM for all subjects. Students can bring questions from school, homework or test papers."),
                announcement("Felicitation ceremony for 2026 board toppers", LocalDate.of(2026, 6, 14), false,
                        "We felicitated our students who scored above 90% in the GSEB and CBSE board exams. Congratulations to all!")
        ));
    }

    private Announcement announcement(String title, LocalDate date, boolean important, String description) {
        return Announcement.builder().title(title).announcementDate(date).important(important)
                .description(description).active(true).build();
    }

    private void seedGallery() {
        galleryRepository.saveAll(List.of(
                gallery("Smart classroom session", "Classrooms", "Concept classes with digital boards and small batches.", "/images/gallery/classroom.svg"),
                gallery("Toppers' felicitation 2026", "Achievements", "Celebrating our board toppers with their parents.", "/images/gallery/felicitation.svg"),
                gallery("Chemistry practical session", "Classrooms", "Hands-on practicals before the board practical exams.", "/images/gallery/lab.svg"),
                gallery("Library and self-study zone", "Facilities", "A quiet space with reference books, open 8 AM to 8 PM.", "/images/gallery/library.svg"),
                gallery("Sunday mock test", "Events", "Full-length tests in exam conditions every week.", "/images/gallery/mock-test.svg"),
                gallery("Science exhibition 2025", "Events", "Students presented working models on space and energy.", "/images/gallery/exhibition.svg")
        ));
    }

    private Gallery gallery(String title, String category, String description, String imageUrl) {
        return Gallery.builder().title(title).category(category).description(description).imageUrl(imageUrl).build();
    }

    private void seedEnquiries() {
        enquiryRepository.saveAll(List.of(
                Enquiry.builder().name("Riya Shah").email("riya.shah@example.com").phone("+91 90000 11111")
                        .message("What are the timings for the Class 10 GSEB batch? Is a demo lecture available?").status("NEW").build(),
                Enquiry.builder().name("Harsh Patel").email("harsh.patel@example.com").phone("+91 90000 22222")
                        .message("I want to join the JEE Main crash course. Please share the fees and start date.").status("CONTACTED").build(),
                Enquiry.builder().name("Komal Mehta").email("komal.mehta@example.com").phone("")
                        .message("Do you have weekend batches for Class 12 Commerce?").status("CLOSED").build()
        ));
    }
}
