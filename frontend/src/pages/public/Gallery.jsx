import useFetch from "../../hooks/useFetch";
import galleryService from "../../services/galleryService";
import { resolveImageUrl } from "../../utils/imageUrl";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

export default function Gallery() {
  const { data: items, loading, error, refetch } = useFetch(() => galleryService.getAll());

  return (
    <div className="container section">
      <h1 className="section-title">Gallery</h1>
      <p className="section-subtitle">Moments from our institute — events, classes, and celebrations</p>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && !items?.length && <EmptyState message="Gallery is empty for now." />}
      {!loading && !error && items?.length > 0 && (
        <div className="grid grid-3">
          {items.map((item) => (
            <div key={item.id} style={{ borderRadius: "var(--radius-md)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
              <img src={resolveImageUrl(item.imageUrl)} alt={item.title} style={{ width: "100%", height: 220, objectFit: "cover" }} />
              <div style={{ padding: 16, background: "var(--color-surface)" }}>
                <h4>{item.title}</h4>
                {item.description && <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
