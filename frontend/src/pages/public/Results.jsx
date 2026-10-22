import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import usePageTitle from "../../hooks/usePageTitle";
import resultService from "../../services/resultService";
import ResultTable from "../../components/public/ResultTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

export default function Results() {
  usePageTitle("Results");
  const [filters, setFilters] = useState({ year: "", className: "", exam: "" });

  const { data: results, loading, error, refetch } = useFetch(
    () => resultService.getAll(cleanFilters(filters)),
    [filters.year, filters.className, filters.exam]
  );

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="container section">
      <h1 className="section-title">Examination Results</h1>
      <p className="section-subtitle">Browse our students' results, filterable by year, class, or exam</p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32, justifyContent: "center" }}>
        <input name="year" type="number" min="2000" max="2100" placeholder="Year (e.g. 2026)" value={filters.year} onChange={handleChange} style={inputStyle} />
        <input name="className" placeholder="Class (e.g. Class 12)" value={filters.className} onChange={handleChange} style={inputStyle} />
        <input name="exam" placeholder="Exam (e.g. Board Exam)" value={filters.exam} onChange={handleChange} style={inputStyle} />
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && !results?.length && <EmptyState message="No results match your filters." />}
      {!loading && !error && results?.length > 0 && <ResultTable results={results} />}
    </div>
  );
}

function cleanFilters(filters) {
  const out = {};
  if (filters.year) out.year = filters.year;
  if (filters.className) out.className = filters.className;
  if (filters.exam) out.exam = filters.exam;
  return out;
}

const inputStyle = {
  padding: "10px 14px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-border)",
  fontSize: "0.9rem",
  minWidth: 200,
};
