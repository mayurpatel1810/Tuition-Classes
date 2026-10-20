export default function ErrorMessage({ message, onRetry }) {
  return (
    <div style={{
      textAlign: "center", padding: "40px 20px", color: "var(--color-error)"
    }}>
      <p style={{ marginBottom: 12 }}>{message}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
