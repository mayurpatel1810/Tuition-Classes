import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import usePageTitle from "../../hooks/usePageTitle";
import galleryService from "../../services/galleryService";
import { resolveImageUrl } from "../../utils/imageUrl";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

export default function Gallery() {
  usePageTitle("Gallery");
  const { data: items, loading, error, refetch } = useFetch(() => galleryService.getAll());
  const [category, setCategory] = useState("All");

  const all = items || [];
  const categories = ["All", ...new Set(all.map((i) => i.category).filter(Boolean))];
  const shown = category === "All" ? all : all.filter((i) => i.category === category);

  return (
    <div className="container section">
      <h1 className="section-title">Gallery</h1>
      <p className="section-subtitle">Moments from our institute — events, classes, and celebrations</p>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && !all.length && <EmptyState message="Gallery is empty for now." />}

      {!loading && !error && all.length > 0 && (
        <>
          {categories.length > 2 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className="btn"
                  style={{
                    padding: "8px 18px", fontSize: "0.88rem",
                    background: category === c ? "var(--color-primary)" : "var(--color-surface)",
                    color: category === c ? "white" : "var(--color-text)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-3">
            {shown.map((item) => (
              <div key={item.id} style={{ borderRadius: "var(--radius-md)", overflow: "hidden", boxShadow: "var(--shadow-sm)", background: "var(--color-surface)" }}>
                <img src={resolveImageUrl(item.imageUrl)} alt={item.title} loading="lazy" style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover" }} />
                <div style={{ padding: 16 }}>
                  {item.category && (
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {item.category}
                    </span>
                  )}
                  <h4>{item.title}</h4>
                  {item.description && <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
