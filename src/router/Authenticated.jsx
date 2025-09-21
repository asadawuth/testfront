import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hook/user-auth";

export default function Authenticated({ children }) {
  const { authUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
