import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = !!localStorage.getItem("isLoggedIn");
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};
