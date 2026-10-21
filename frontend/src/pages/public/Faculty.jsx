import useFetch from "../../hooks/useFetch";
import facultyService from "../../services/facultyService";
import FacultyCard from "../../components/public/FacultyCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

export default function Faculty() {
  const { data: faculty, loading, error, refetch } = useFetch(() => facultyService.getAll());

  return (
    <div className="container section">
      <h1 className="section-title">Our Faculty</h1>
      <p className="section-subtitle">Meet the educators dedicated to your success</p>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && !faculty?.length && <EmptyState message="Faculty details coming soon." />}
      {!loading && !error && faculty?.length > 0 && (
        <div className="grid grid-4">
          {faculty.map((f) => <FacultyCard key={f.id} faculty={f} />)}
        </div>
      )}
    </div>
  );
}
