import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../authFront/auth";

//route wrapper component that checks if there is  token load righ direction otherwise return to login
const ProtectedRoute = () => {
  const [auth, setAuth] = useState(null); 

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();
      setAuth(result);
    };

    checkAuth();
  }, []);

  if (auth === null) {
    return <div>Loading...</div>; 
  }

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
