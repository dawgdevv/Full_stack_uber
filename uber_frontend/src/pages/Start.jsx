import UberHome from "../assets/Uber.home.png";
import UberCab from "../assets/uber.cab.jpg";
import { Link } from "react-router-dom";

function Start() {
  return (
    <div>
      <div
        className="h-screen pt-8 flex justify-between flex-col w-full "
        style={{
          backgroundImage: `url(${UberCab})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img className="w-20 ml-8" src={UberHome}></img>
        <div className="bg-white pb-7 py-5 px-10">
          <h2 className="text-2xl font-bold">Get started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full font-semibold bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Start;
