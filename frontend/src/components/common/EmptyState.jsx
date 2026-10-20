export default function EmptyState({ message = "Nothing to show here yet." }) {
  return (
    <div style={{
      textAlign: "center", padding: "48px 20px", color: "var(--color-text-muted)"
    }}>
      {message}
    </div>
  );
}
