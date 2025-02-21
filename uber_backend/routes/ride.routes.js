import express from "express";
import {
  createRides,
  getFares,
  confirmRides,
  startRides,
  endRides,
} from "../controllers/ride.controller.js";
import { body, query } from "express-validator";
import { authuser, authCaptain } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/create",
  authuser,
  body("pickup").isString().withMessage("Invalid Pickup Address"),
  body("destination").isString().withMessage("Invalid Destination Address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "bike"])
    .withMessage("Invalid Vehicle Type"),
  createRides
);

router.get("/get-fare", authuser, getFares);

router.post(
  "/confirm",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  confirmRides
);

router.get(
  "/start-ride",
  authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  startRides
);

router.post(
  "/end-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  endRides
);

export default router;
