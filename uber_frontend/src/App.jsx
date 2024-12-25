import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start.jsx";
import LoginUser from "./pages/Login.user.jsx";
import RegisterUser from "./pages/Signup.user.jsx";
import SignupCaptain from "./pages/Signup.captain.jsx";
import LoginCaptain from "./pages/Login.captain.jsx";
import Home from "./pages/Home.jsx";
import CaptainHome from "./pages/Captain.Home.jsx";
import UserContext from "./context/UserContext";
import CaptainContext from "./context/CaptainContext";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

function App() {
  return (
    <UserContext>
      <CaptainContext>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute requiredRole="user">
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/captain-register" element={<SignupCaptain />} />
          <Route path="/captain-login" element={<LoginCaptain />} />

          <Route
            path="/captain-home"
            element={
              <ProtectedRoute requiredRole="captain">
                <CaptainHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CaptainContext>
    </UserContext>
  );
}

export default App;
