import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import "./TakeQuiz.css";

export default function TakeQuiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({}); // {questionId: "A"}
  const [msg, setMsg] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/quizzes/${id}`);
        setQuiz(data);
        setTimeLeft(data.timeLimitSeconds);
      } catch {
        setMsg("Failed to load quiz");
      }
    })();
  }, [id]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      submit();
    }
  }, [timeLeft]);

  const submit = async (e) => {
    if (e) e.preventDefault();
    try {
      const payload = {
        answers: Object.entries(answers).map(([questionId, chosenOption]) => ({
          questionId: Number(questionId),
          chosenOption,
        })),
      };
      const { data } = await api.post(`/attempts/${id}/submit`, payload);
      setMsg(`Submitted ✅ Score: ${data.score ?? "(see backend response)"}`);
    } catch {
      setMsg("⚠️ Access Denied! You must log in to continue 🚫");
    }
  };

  if (!quiz)
    return <div style={{ textAlign: "center" }}>Loading quiz… {msg}</div>;

  return (
    <form onSubmit={submit} className="quiz-wrap">
      <div className="timer">
        Time Left: {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </div>
      <div className="quiz-title">{quiz.title}</div>

      {quiz.questions?.map((q) => (
        <div key={q.id} className="question-card">
          <h3>{q.text}</h3>

          <div className="options">
            {["A", "B", "C", "D"].map((letter) => {
              const optKey = `option${letter}`; // optionA/optionB...
              return (
                <label key={letter} className="option">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={letter}
                    checked={answers[q.id] === letter}
                    onChange={() => setAnswers({ ...answers, [q.id]: letter })}
                  />
                  <span>{q[optKey]}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <div className="submit-row">
        <button className="btn">Submit Attempt</button>
      </div>

      <p className="note">{msg}</p>
    </form>
  );
}
