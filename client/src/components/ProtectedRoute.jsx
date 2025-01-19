import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const { isAuthenticated, refreshAuth } = useAuth();

  useEffect(() => {
    refreshAuth()
  },[])

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};
export default ProtectedRoute;
