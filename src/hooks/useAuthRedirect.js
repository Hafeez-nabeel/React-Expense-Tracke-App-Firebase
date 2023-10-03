// useAuthRedirect.js
import { useNavigate } from "react-router-dom";

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    // Check if the user is authenticated.
    const auth = localStorage.getItem("auth");
    return auth !== null;
  };

  if (!isAuthenticated()) {
    navigate("/");
  }
};
