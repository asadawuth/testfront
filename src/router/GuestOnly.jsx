// GuestOnly.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hook/user-auth";

export default function GuestOnly({ children }) {
  const { authUser } = useAuth();
  const location = useLocation();

  if (authUser) {
    const to = location.state?.from?.pathname || "/booking";
    return <Navigate to="/booking" replace />;
  }
  return children;
}
