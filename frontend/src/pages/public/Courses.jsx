import useFetch from "../../hooks/useFetch";
import courseService from "../../services/courseService";
import CourseCard from "../../components/public/CourseCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

export default function Courses() {
  const { data: courses, loading, error, refetch } = useFetch(() => courseService.getAll());

  return (
    <div className="container section">
      <h1 className="section-title">Our Courses</h1>
      <p className="section-subtitle">Find the right course for your class and goals</p>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && !courses?.length && <EmptyState message="No courses available yet." />}
      {!loading && !error && courses?.length > 0 && (
        <div className="grid grid-3">
          {courses.filter((c) => c.active !== false).map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </div>
  );
}
