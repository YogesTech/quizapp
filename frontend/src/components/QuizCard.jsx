/* Simple, reusable quiz card */
export default function QuizCard({ title, description, onOpen }) {
  return (
    <div className="card" onClick={onOpen}>
      <div className="pill" aria-hidden>
        Quiz
      </div>
      <h3>{title}</h3>
      <p>{description || "No description"}</p>
      <div className="meta">
        <span style={{ color: "var(--muted)", fontSize: 13 }}>
          ~10 questions
        </span>
        <button className="btn" onClick={onOpen}>
          Start
        </button>
      </div>
    </div>
  );
}
