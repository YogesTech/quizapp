import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setBusy(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      if (!data?.token) throw new Error("No token");
      localStorage.setItem("token", data.token);

      // update navbar immediately
      window.dispatchEvent(new Event("storage"));

      navigate("/"); // go to home/quizzes
    } catch {
      setMsg("Login failed ❌");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto bg-white p-4 rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      <input
        className="w-full border p-2 mb-3"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="w-full border p-2 mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2
                   font-medium text-white shadow-sm cursor-pointer select-none
                   transition-all duration-200
                   hover:bg-green-700 hover:shadow-md hover:-translate-y-0.5
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {busy ? "Signing in..." : "Login"}
      </button>

      <p className="mt-3 text-sm">{msg}</p>
    </form>
  );
}
