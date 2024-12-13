import CaptainModel from "../models/captain.model.js";
import BlacklistToken from "../models/blacklisttoken.model.js";
import { createCaptain } from "../services/captain.services.js";
import { validationResult } from "express-validator";

export async function RegisterCaptain(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {
      fullname: { firstname, lastname },
      email,
      password,
      vehicle: { vehicleType, color, plateNumber, capacity },
    } = req.body;

    const iscaptainExist = await CaptainModel.findOne({ email });
    if (iscaptainExist) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await CaptainModel.hashPassword(password);

    const newCaptain = await createCaptain({
      fullname: { firstname, lastname },
      email,
      password: hashedPassword,
      vehicle: { vehicleType, color, plateNumber, capacity },
      status: "online",
    });

    const token = newCaptain.generateAuthToken();

    res.status(201).json({
      message: "Captain created successfully",
      token,
      captain: {
        id: newCaptain._id,
        email: newCaptain.email,
        fullname: newCaptain.fullname,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    next(error);
  }
}

export async function loginCaptain(req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const captain = await CaptainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({
      token,
      captain: {
        id: captain._id,
        email: captain.email,
        fullname: captain.fullname,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
}

export async function captainProfile(req, res, next) {
  res.status(200).json(req.captain);
}

export async function captainLogout(req, res, next) {
  const token = req.cookies.token;
  const blacklistToken = new BlacklistToken({ token });
  await blacklistToken.save();
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successfully" });
}
