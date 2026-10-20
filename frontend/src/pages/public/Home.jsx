import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import courseService from "../../services/courseService";
import topperService from "../../services/topperService";
import announcementService from "../../services/announcementService";
import CourseCard from "../../components/public/CourseCard";
import TopperCard from "../../components/public/TopperCard";
import AnnouncementCard from "../../components/public/AnnouncementCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";

export default function Home() {
  const { data: courses, loading: coursesLoading } = useFetch(() => courseService.getAll());
  const { data: toppers, loading: toppersLoading } = useFetch(() => topperService.getAll());
  const { data: announcements, loading: announcementsLoading } = useFetch(() => announcementService.getAll());

  return (
    <>
      <section style={{
        background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
        color: "white", padding: "100px 0", textAlign: "center"
      }}>
        <div className="container">
          <h1 style={{ fontSize: "2.75rem", marginBottom: 16 }}>Bright Future Institute</h1>
          <p style={{ fontSize: "1.15rem", opacity: 0.9, marginBottom: 8 }}>
            Excellence in Education, Since 2010
          </p>
          <p style={{ maxWidth: 560, margin: "0 auto 32px", opacity: 0.85 }}>
            We help students unlock their full academic potential through expert mentorship,
            proven teaching methods, and a genuine commitment to every learner's success.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">What makes our institute the right choice for your child's academic journey</p>
          <div className="grid grid-4">
            {[
              { icon: "🎯", title: "Result-Oriented", text: "Proven track record of top ranks and high scores." },
              { icon: "👩‍🏫", title: "Expert Faculty", text: "Experienced educators passionate about teaching." },
              { icon: "📚", title: "Structured Curriculum", text: "Carefully designed courses aligned to exam patterns." },
              { icon: "🤝", title: "Personal Attention", text: "Small batches ensure every student is heard." },
            ].map((f) => (
              <div key={f.title} style={{ textAlign: "center", padding: 24 }}>
                <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>{f.icon}</div>
                <h4 style={{ marginBottom: 8 }}>{f.title}</h4>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-surface)" }}>
        <div className="container">
          <h2 className="section-title">Our Courses</h2>
          <p className="section-subtitle">Explore our range of courses designed for every class and goal</p>
          {coursesLoading ? <LoadingSpinner /> : !courses?.length ? <EmptyState message="Courses coming soon." /> : (
            <div className="grid grid-3">
              {courses.slice(0, 3).map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Top Performers</h2>
          <p className="section-subtitle">Celebrating the hard work and achievements of our students</p>
          {toppersLoading ? <LoadingSpinner /> : !toppers?.length ? <EmptyState message="Topper list coming soon." /> : (
            <div className="grid grid-4">
              {toppers.slice(0, 4).map((t) => <TopperCard key={t.id} topper={t} />)}
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-surface)" }}>
        <div className="container">
          <h2 className="section-title">Latest Announcements</h2>
          {announcementsLoading ? <LoadingSpinner /> : !announcements?.length ? <EmptyState message="No announcements right now." /> : (
            <div className="grid grid-2">
              {announcements.slice(0, 4).map((a) => <AnnouncementCard key={a.id} announcement={a} />)}
            </div>
          )}
        </div>
      </section>

      <section style={{ background: "var(--color-primary)", color: "white", padding: "64px 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ marginBottom: 12 }}>Ready to Begin?</h2>
          <p style={{ opacity: 0.85, marginBottom: 24 }}>Reach out today and take the first step toward academic excellence.</p>
          <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
        </div>
      </section>
    </>
  );
}
