import captainModel from "../models/captain.model.js";

export async function createCaptain({
  fullname: { firstname, lastname },
  email,
  password,
  vehicle: { vehicleType, color, plateNumber, capacity },
}) {
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !vehicleType ||
    !color ||
    !plateNumber ||
    !capacity
  ) {
    throw new Error("All fields are required");
  }

  const newCaptain = await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      vehicleType,
      color,
      plateNumber,
      capacity,
    },
  });

  return newCaptain;
}
