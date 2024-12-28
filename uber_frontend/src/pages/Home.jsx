import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import Logout from "../pages/Logout.jsx";
import UberHome from "../assets/Uber.home.png";
import UberMap from "../assets/Uber.map.webp";
import UberCar from "../assets/Uber.car.png";
import UberBike from "../assets/Uber.Bike.webp";
import AutoImage from "../assets/Uber.Auto.webp";
import LocationSearch from "../Components/LocationSearchPanel.jsx";
import { FaArrowDownUpAcrossLine } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

function Home() {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [isvisible, setIsvisible] = useState(false);
  const panelRef = useRef(null);

  const togglevisible = () => {
    setIsvisible(!isvisible);
  };

  useEffect(() => {
    gsap.to(panelRef.current, {
      height: isvisible ? "70%" : "0%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [isvisible]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-20 absolute left-5 top-5"
        src={UberHome}
        alt="Uber Home"
      />
      <Logout />
      <div className="h-screen w-screen">
        <img
          src={UberMap}
          alt="Uber Map"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative">
          <button onClick={togglevisible}>
            <FaArrowDownUpAcrossLine />
          </button>
          <h4 className="text-2xl font-semibold">Find a Trip?</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={pickup}
              onChange={(e) => setpickup(e.target.value)}
              className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter your location"
            />
            <input
              value={destination}
              onChange={(e) => setdestination(e.target.value)}
              className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white overflow-hidden">
          <LocationSearch />
        </div>
      </div>

      <div className="fixed bottom-0 w-full bg-white shadow-lg max-h-[60vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mt-3 ml-2 text-black">
          Select a Ride
        </h3>
        <div className="p-4 space-y-4">
          {/* UberGo Card */}
          <div className="border-2 active:border-black bg-gray-100  flex items-center justify-between p-3 bg-white rounded-lg">
            <img
              src={UberCar}
              alt="Uber Car"
              className="w-20 mr-4 rounded-full border border-black"
            />
            <div className="flex flex-col items-center justify-center flex-grow text-center">
              <h4 className="text-lg font-semibold flex items-center justify-center w-full">
                UberGo
                <span className="ml-2 flex items-center">
                  <FaUser className="mr-1" /> 4
                </span>
              </h4>
              <h5 className="text-black font-semibold">2 min away</h5>
              <p className="text-sm text-gray-600">Affordable, Compact ride</p>
            </div>
            <p className="text-lg font-semibold">₹192.56</p>
          </div>

          {/* UberAuto Card */}
          <div className="border-2 active:border-black bg-gray-100 flex items-center justify-between p-3 bg-white rounded-lg">
            <img
              src={AutoImage}
              alt="Auto"
              className="w-20 mr-4 rounded-full border border-black"
            />
            <div className="flex flex-col items-center justify-center flex-grow text-center">
              <h4 className="text-lg font-semibold flex items-center justify-center w-full">
                UberAuto
                <span className="ml-2 flex items-center">
                  <FaUser className="mr-1" /> 3
                </span>
              </h4>
              <h5 className="text-black font-semibold">4 min away</h5>
              <p className="text-sm text-gray-600">
                Affordable, Convenient ride
              </p>
            </div>
            <p className="text-lg font-semibold">₹70.00</p>
          </div>

          {/* UberBike Card */}
          <div className="border-2 active:border-black bg-gray-100 flex items-center justify-between p-3 bg-white rounded-lg">
            <img
              src={UberBike}
              alt="Bike"
              className="w-20 mr-4 rounded-full border border-black"
            />
            <div className="flex flex-col items-center justify-center flex-grow text-center">
              <h4 className="text-lg font-semibold flex items-center justify-center w-full">
                UberBike
                <span className="ml-2 flex items-center">
                  <FaUser className="mr-1" /> 1
                </span>
              </h4>
              <h5 className="text-black font-semibold">3 min away</h5>
              <p className="text-sm text-gray-600">Affordable, Quick ride</p>
            </div>
            <p className="text-lg font-semibold">₹50.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
