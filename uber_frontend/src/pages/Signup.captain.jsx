import { useState, useContext } from "react";
import UberDriver from "../assets/Uber.driver.png";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignupCaptain() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [color, setColor] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [capacity, setCapacity] = useState("");

  const navigate = useNavigate();

  const { setCaptain } = useContext(CaptainDataContext);
  const submithandler = async (e) => {
    e.preventDefault();

    if (capacity < 1) {
      alert("Vehicle capacity must be at least 1.");
      return;
    }

    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email.toLowerCase(),
      password: password,
      vehicle: {
        color: color,
        plateNumber: plateNumber,
        capacity: capacity,
        vehicleType: vehicleType,
      },
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        newCaptain
      );
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-login");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleType("");
    setColor("");
    setPlateNumber("");
    setCapacity("");
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <img className="w-20 " src={UberDriver} alt="Uber Home" />
      <h1 className="text-2xl font-bold mb-2">Register as Captain</h1>
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vehicleType"
          >
            Vehicle Type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="vehicleType"
            type="text"
            placeholder="Vehicle Type"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="color"
          >
            Vehicle Color
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="color"
            type="text"
            placeholder="Vehicle Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="plateNumber"
          >
            Plate Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="plateNumber"
            type="text"
            placeholder="Plate Number"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="capacity"
          >
            Vehicle Capacity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="capacity"
            type="number"
            placeholder="Vehicle Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-black hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <div>
        <p>
          Already a Captain?{" "}
          <Link className="text-blue-600" to="/captain-login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupCaptain;
