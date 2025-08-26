import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminQuiz from "./pages/AdminQuiz.jsx";
import QuizList from "./pages/QuizList.jsx";
import TakeQuiz from "./pages/TakeQuiz.jsx";
import MyAttempts from "./pages/MyAttempts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout + navbar
    children: [
      { index: true, element: <QuizList /> }, // home shows quizzes
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "admin", element: <AdminQuiz /> },
      { path: "quiz/:id", element: <TakeQuiz /> },
      { path: "attempts", element: <MyAttempts /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
