import RideModel from "../models/ride.model.js";
import crypto from "crypto";
import {
  getAddressCoordinate,
  getDistanceBetweenTwoLocations,
  getAutoSuggestions,
} from "../services/maps.services.js";

export async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await getDistanceBetweenTwoLocations(
    pickup,
    destination
  );

  console.log(distanceTime);

  const baseFare = {
    auto: 30,
    car: 50,
    bike: 20,
  };
  const farePerKm = {
    auto: 10,
    car: 15,
    bike: 5,
  };

  const farePerMin = {
    auto: 2,
    car: 3,
    bike: 1,
  };

  const fare = {
    auto: Math.floor(
      baseFare.auto +
        (farePerKm.auto * distanceTime.distance.value) / 1000 +
        (farePerMin.auto * distanceTime.duration.value) / 60
    ),
    car: Math.floor(
      baseFare.car +
        (farePerKm.car * distanceTime.distance.value) / 1000 +
        (farePerMin.car * distanceTime.duration.value) / 60
    ),
    bike: Math.floor(
      baseFare.bike +
        (farePerKm.bike * distanceTime.distance.value) / 1000 +
        (farePerMin.bike * distanceTime.duration.value) / 60
    ),
  };

  console.log(fare);

  return fare;
}

function getOtp(num) {
  const otp = Math.floor(
    Math.pow(10, num - 1) +
      Math.random() * (Math.pow(10, num) - Math.pow(10, num - 1))
  );
  const hashOtp = crypto
    .createHash("sha256")
    .update(otp.toString())
    .digest("hex");

  return { otp: otp.toString(), hashOtp };
}

export async function createRide({ user, pickup, destination, vehicleType }) {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("User, pickup, destination and vehicleType are required");
  }

  const fare = await getFare(pickup, destination);
  const { otp, hashOtp } = getOtp(6);

  const ride = new RideModel({
    user: user,
    pickup: pickup,
    destination: destination,
    vehicleType: vehicleType,
    otp: otp,
    fare: fare[vehicleType],
  });

  return ride.save();
}

export async function confirmRide({ rideId, captain }) {
  if (!rideId || !captain) {
    throw new Error("Ride id and captain are required");
  }

  const ride = await RideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "accepted",
      captain: captain._id,
    },
    { new: true }
  )
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
}

export async function startRide({ rideId, otp, captain }) {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await RideModel.findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await RideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "ongoing",
    }
  );

  return ride;
}

export async function endRide({ rideId, captain }) {
  if (!rideId || !captain) {
    throw new Error("Ride id and captain are required");
  }

  const ride = await RideModel.findOne({ _id: rideId })
    .populate("user")
    .populate("captain");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await RideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "completed",
    }
  );

  return ride;
}
