import useFetch from "../../hooks/useFetch";
import usePageTitle from "../../hooks/usePageTitle";
import courseService from "../../services/courseService";
import CourseCard from "../../components/public/CourseCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

export default function Courses() {
  usePageTitle("Courses");
  const { data: allCourses, loading, error, refetch } = useFetch(() => courseService.getAll());
  const courses = (allCourses || []).filter((c) => c.active !== false);

  return (
    <div className="container section">
      <h1 className="section-title">Our Courses</h1>
      <p className="section-subtitle">Find the right course for your class and goals</p>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && !courses?.length && <EmptyState message="No courses available yet." />}
      {!loading && !error && courses?.length > 0 && (
        <div className="grid grid-3">
          {courses.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </div>
  );
}
