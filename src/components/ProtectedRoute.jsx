import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
