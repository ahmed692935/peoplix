import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

const PrivateRoute = ({ children, allowedRoles }: Props) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(role || "")) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default PrivateRoute;
