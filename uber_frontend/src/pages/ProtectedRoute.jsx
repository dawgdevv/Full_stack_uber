import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { UserDataContext } from "../context/UserContext";
import { CaptainDataContext } from "../context/CaptainContext";

function ProtectedRoute({ children, requiredRole }) {
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);
  const { captain } = useContext(CaptainDataContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (requiredRole === "user" && !user) {
      navigate("/login");
    } else if (requiredRole === "captain" && !captain) {
      navigate("/captain-login");
    }
  }, [token, navigate, user, captain, requiredRole]);

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.oneOf(["user", "captain"]).isRequired,
};

export default ProtectedRoute;
