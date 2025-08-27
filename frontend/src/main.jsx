import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "./App.jsx";
import QuizList from "./pages/QuizList.jsx";
import TakeQuiz from "./pages/TakeQuiz.jsx";
import MyAttempts from "./pages/MyAttempts.jsx";
import AdminQuiz from "./pages/AdminQuiz.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <QuizList /> }, // "/"
      { path: "quizzes", element: <QuizList /> }, // "/quizzes"
      { path: "quizzes/:id", element: <TakeQuiz /> }, // "/quizzes/1"
      { path: "attempts", element: <MyAttempts /> }, // "/attempts"
      { path: "admin", element: <AdminQuiz /> }, // "/admin"
      { path: "login", element: <Login /> }, // "/login"
      { path: "register", element: <Register /> }, // "/register"
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
