import useFetch from "../../hooks/useFetch";
import usePageTitle from "../../hooks/usePageTitle";
import topperService from "../../services/topperService";
import TopperCard from "../../components/public/TopperCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

export default function Toppers() {
  usePageTitle("Our Toppers");
  const { data: toppers, loading, error, refetch } = useFetch(() => topperService.getAll());

  return (
    <div className="container section">
      <h1 className="section-title">Our Toppers</h1>
      <p className="section-subtitle">Celebrating the achievements of our star students</p>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && !toppers?.length && <EmptyState message="No toppers listed yet." />}
      {!loading && !error && toppers?.length > 0 && (
        <div className="grid grid-4">
          {toppers.map((t) => <TopperCard key={t.id} topper={t} />)}
        </div>
      )}
    </div>
  );
}
