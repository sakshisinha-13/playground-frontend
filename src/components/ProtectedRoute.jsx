// src/components/ProtectedRoute.jsx
// -----------------------------------------------------------------------------
// Wrapper component to protect routes in the app.
// - Redirects to /login if user is not authenticated
// - Otherwise renders the child components
// -----------------------------------------------------------------------------

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  // ✅ Check if user is logged in (presence of user in localStorage)
  const user = localStorage.getItem("codeplayground-user");

  // 🔐 If not logged in, redirect to login page
  return user ? children : <Navigate to="/login" />;
}
