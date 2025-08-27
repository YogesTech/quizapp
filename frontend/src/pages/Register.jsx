import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "PARTICIPANT",
  });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const on = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setBusy(true);
    try {
      await api.post("/auth/register", form);
      setMsg("Registered ✅");
      //  go to login
      navigate("/login");
    } catch {
      setMsg("Register failed ❌");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto bg-white p-4 rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Register</h2>

      <input
        className="w-full border p-2 mb-2"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={on}
        required
      />
      <input
        className="w-full border p-2 mb-2"
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={on}
        required
      />
      <input
        className="w-full border p-2 mb-2"
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={on}
        minLength={6}
        required
      />
      <select
        className="w-full border p-2 mb-3"
        name="role"
        value={form.role}
        onChange={on}
      >
        <option value="PARTICIPANT">PARTICIPANT</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2
             font-medium text-white shadow-sm transition-all duration-200
             hover:bg-green-700 hover:shadow-md hover:-translate-y-0.5
             cursor-pointer disabled:cursor-not-allowed"
      >
        {busy ? "Registering..." : "Register"}
      </button>

      <p className="mt-3 text-sm">{msg}</p>
    </form>
  );
}
