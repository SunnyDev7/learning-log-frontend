import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { Loader } from "../ui/loader.jsx";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader message="Checking authentication..." />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
