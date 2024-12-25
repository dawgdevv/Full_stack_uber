import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UberHome from "../assets/Uber.home.png";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        newUser
      );
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "user");
        navigate("/home");
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
      <img className="w-20" src={UberHome}></img>

      <h1 className="text-xl font-bold mb-2">Welcome Passenger ..</h1>
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
          New to booking a ride?{""}
          <a className="text-blue-600" href="/register">
            Sign Up
          </a>
        </p>
        <div className="bg-green-600 flex  justify-center text-white p-2 rounded mt-20">
          <Link to="/captain-login" className="text-white">
            Login as Captain
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
