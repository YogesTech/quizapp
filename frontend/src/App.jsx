import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

function getRoleFromToken() {
  const t = localStorage.getItem("token");
  if (!t) return null;
  try {
    const payload = JSON.parse(atob(t.split(".")[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}

export default function App() {
  const [role, setRole] = useState(getRoleFromToken());
  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = () => setRole(getRoleFromToken());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setRole(null);
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="inner">
          <Link to="/" className="brand">
            QuizApp
          </Link>

          <div style={{ display: "flex", gap: 14 }}>
            <Link to="/">Quizzes</Link>
            {role === "ADMIN" && <Link to="/admin">Admin</Link>}
            <Link to="/attempts">My Attempts</Link>
          </div>

          <div className="navlinks">
            {!role ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <button
                onClick={logout}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#dc2626",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
