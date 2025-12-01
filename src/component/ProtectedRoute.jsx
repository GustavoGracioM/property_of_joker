import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuth, loading } = useContext(AuthContext);

  if (loading) return null; // ou um loading spinner

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}
