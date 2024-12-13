import userModel from "../models/user.model.js";
import BlacklistToken from "../models/blacklisttoken.model.js";
import { createUser } from "../services/user.services.js";
import { validationResult } from "express-validator";

export async function registerUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.status(201).json({ token });
}
export async function login(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, user });
}

export async function userprofile(req, res, next) {
  res.status(200).json(req.user);
}

export async function logout(req, res, next) {
  res.clearCookie("token");

  const token = req.cookies.token || req.header.authorization.split(" ")[1];

  await BlacklistToken.create({ token });
  res.status(200).json({ message: "Logged out" });
}
