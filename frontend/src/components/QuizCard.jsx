export default function QuizCard({ title, description, questions, onOpen }) {
  const count = Number.isFinite(questions?.length) ? questions.length : 0;
  const label = count === 1 ? "question" : "questions";

  return (
    <div className="card" onClick={onOpen} role="button" tabIndex={0}>
      <div className="pill" aria-hidden>
        Quiz
      </div>
      <h3>{title}</h3>
      <p>{description || "No description"}</p>
      <div className="meta">
        <span style={{ color: "var(--muted)", fontSize: 13 }}>
          {count} {label}
        </span>
        <button
          className="btn"
          onClick={(e) => {
            e.stopPropagation();
            onOpen?.();
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}
