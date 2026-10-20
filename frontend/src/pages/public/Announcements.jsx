import useFetch from "../../hooks/useFetch";
import announcementService from "../../services/announcementService";
import AnnouncementCard from "../../components/public/AnnouncementCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

export default function Announcements() {
  const { data: announcements, loading, error, refetch } = useFetch(() => announcementService.getAll());

  return (
    <div className="container section">
      <h1 className="section-title">Announcements</h1>
      <p className="section-subtitle">Stay up to date with the latest news from our institute</p>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && !announcements?.length && <EmptyState message="No announcements right now." />}
      {!loading && !error && announcements?.length > 0 && (
        <div className="grid grid-2">
          {announcements.map((a) => <AnnouncementCard key={a.id} announcement={a} />)}
        </div>
      )}
    </div>
  );
}
