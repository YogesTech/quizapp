import { useEffect, useState } from "react";
import api from "../api";

export default function MyAttempts() {
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/attempts/my");
        setItems(Array.isArray(data) ? data : []);
      } catch {
        setMsg("Load failed (login first?)");
      }
    })();
  }, []);

  const total = items.length;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">My Attempts</h3>
      {msg && <p className="text-sm mb-2">{msg}</p>}

      <ul className="list-disc pl-6">
        {items.map((a, i) => (
          <li key={a.id ?? i} className="mb-1 text-sm">
            {/* Newest-first list → ordinal = total - i */}
            Attempt #{total - i} —{" "}
            {a.quizTitle ?? (a.quizId ? `Quiz #${a.quizId}` : "Quiz")} — Score:{" "}
            {a.score ?? "N/A"}
          </li>
        ))}
      </ul>

      {items.length === 0 && !msg && (
        <p className="text-sm mt-2">No attempts yet.</p>
      )}
    </div>
  );
}
