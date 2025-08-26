import { useEffect, useMemo, useState } from "react";
import "./../home.css";
import QuizCard from "../components/QuizCard";
import api from "../api";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    api
      .get("/quizzes")
      .then((res) => setQuizzes(res.data))
      .catch(() => setQuizzes([]));
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return quizzes;
    return quizzes.filter(
      (x) =>
        x.title?.toLowerCase().includes(s) ||
        x.description?.toLowerCase().includes(s)
    );
  }, [q, quizzes]);

  return (
    <div className="container">
      <section className="hero">
        <h1>Available Quizzes</h1>
        <p>
          Pick a quiz and challenge yourself. Your attempts are saved to your
          account.
        </p>
        <div className="toolbar">
          <input
            className="input"
            placeholder="Search quizzes…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="empty">No quizzes match your search.</div>
      ) : (
        <div className="grid">
          {filtered.map((qz) => (
            <QuizCard
              key={qz.id}
              title={qz.title}
              description={qz.description}
              onOpen={() => (window.location.href = `/quiz/${qz.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
