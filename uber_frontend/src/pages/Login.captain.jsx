import UberDriver from "../assets/Uber.driver.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

function LoginCaptain() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();

    const captain = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captain
      );

      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "captain");
        navigate("/captain-home");
      } else {
        alert("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="container mx-auto p-7 max-w-md">
      <img className="w-20" src={UberDriver}></img>

      <h1 className="text-xl font-bold mb-2">Welcome Captain ..</h1>
      <form
        onSubmit={submithandler}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-black hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
      <div>
        <p>
          Join a fleet?{""}
          <a className="text-blue-600" href="/captain-register">
            Become Captain
          </a>
        </p>
        <div className="bg-green-600 flex  justify-center text-white p-2 rounded mt-20">
          <Link to="/login" className="text-white">
            Login as User
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginCaptain;
