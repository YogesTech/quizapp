import { useState } from "react";
import api from "../api";

export default function AdminQuiz() {
  const [quiz, setQuiz] = useState({ title: "", description: "" });
  const [createdId, setCreatedId] = useState(null);
  const [q, setQ] = useState({
    text: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: "A",
  });
  const [msg, setMsg] = useState("");

  const createQuiz = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/quizzes", {
        ...quiz,
        timeLimitSeconds: 300,
      });
      setCreatedId(data.id);
      setMsg(`Quiz created with id ${data.id}`);
    } catch {
      setMsg("Failed to create quiz");
    }
  };

  const [addedCount, setAddedCount] = useState(0);

  const addQuestion = async (e) => {
    e.preventDefault();
    if (!createdId) {
      setMsg("Create a quiz first");
      return;
    }

    try {
      await api.post(`/quizzes/${createdId}/questions`, q);
      setMsg("Question added ✅");
      setAddedCount((c) => c + 1);
      setQ({
        text: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctOption: "A",
      });
    } catch {
      setMsg("Failed to add question");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <form onSubmit={createQuiz} className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Create Quiz</h3>
        <input
          className="w-full border p-2 mb-2"
          placeholder="Title"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-3"
          placeholder="Description"
          value={quiz.description}
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
        />
        <button className="bg-black text-white px-3 py-2 rounded">
          Create
        </button>
      </form>

      <form onSubmit={addQuestion} className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">
          Add Question{" "}
          {createdId && (
            <span className="text-xs text-gray-600">(Quiz #{createdId})</span>
          )}
          {addedCount > 0 && (
            <span className="ml-2 text-xs text-green-600">
              ({addedCount} added)
            </span>
          )}
        </h3>

        <textarea
          className="w-full border p-2 mb-2"
          placeholder="Question text"
          value={q.text}
          onChange={(e) => setQ({ ...q, text: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-2"
          placeholder="Option A"
          value={q.optionA}
          onChange={(e) => setQ({ ...q, optionA: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-2"
          placeholder="Option B"
          value={q.optionB}
          onChange={(e) => setQ({ ...q, optionB: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-2"
          placeholder="Option C"
          value={q.optionC}
          onChange={(e) => setQ({ ...q, optionC: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-3"
          placeholder="Option D"
          value={q.optionD}
          onChange={(e) => setQ({ ...q, optionD: e.target.value })}
        />
        <select
          className="w-full border p-2 mb-3"
          value={q.correctOption}
          onChange={(e) => setQ({ ...q, correctOption: e.target.value })}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <button className="bg-green-600 text-white px-3 py-2 rounded">
          Add Question
        </button>
      </form>

      <p className="md:col-span-2 text-sm">{msg}</p>
    </div>
  );
}
