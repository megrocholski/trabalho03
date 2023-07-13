import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

export const ProtectedRoute = ({ children }) => {
  //   const { user } = useAuth();
  let user = null;
  user = localStorage.getItem("user");
  //   axios
  //     .get(`http://localhost:8080/api/user/${localStorage.getItem("user")}`)
  //     .then((data) => (user = data.data));

  if (user == 0 || user == null) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
