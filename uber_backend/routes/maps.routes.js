import express from "express";
const router = express.Router();
import {
  getCoordinates,
  getDistance,
  getAutoSuggestion,
} from "../controllers/maps.controller.js";
import { authuser, authCaptain } from "../middleware/auth.middleware.js";

router.get("/get-coordinates", authuser, getCoordinates);

router.get("/get-distance", authuser, getDistance);

router.get("/get-autosuggestions", authuser, getAutoSuggestion);

export default router;
