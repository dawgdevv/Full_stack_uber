import { useState } from "react";

import Logout from "../pages/Logout.jsx";
import UberHome from "../assets/Uber.home.png";
import UberMap from "../assets/Uber.map.webp";

function Home() {
  const [set, setstate] = useState(false);
  return (
    <div className="h-screen  relative">
      <img className="w-20 absolute left-5 top-5" src={UberHome}></img>
      <Logout />
      <div className="h-screen w-screen">
        <img
          src={UberMap}
          alt="Uber Map"
          className="h-full w-full object-cover"
        />
      </div>

      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative">
          <h4 className="text-2xl font-semibold">Find a Trip?</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="line absolute h-16 w-1 top-[35%] bg-gray-900 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter your location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div className="h-[70%] bg-red-500 hidden  "></div>
      </div>
    </div>
  );
}

export default Home;