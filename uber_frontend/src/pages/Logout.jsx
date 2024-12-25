import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

function LogoutButton() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user, captain]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const endpoint =
        role === "captain" ? "/captains/logout" : "/users/logout";

      await axios.get(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setCaptain(null);
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    isLoggedIn && (
      <button
        onClick={handleLogout}
        className="bg-black text-white px-1 py-1 text-sm rounded hover:bg-red-600 fixed top-5 right-10"
        aria-label="Logout"
      >
        Logout
      </button>
    )
  );
}

export default LogoutButton;
