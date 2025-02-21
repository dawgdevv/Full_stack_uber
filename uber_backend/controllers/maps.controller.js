import {
  getAddressCoordinate,
  getDistanceBetweenTwoLocations,
  getAutoSuggestions,
} from "../services/maps.services.js";
import { validationResult } from "express-validator";

export async function getCoordinates(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const address = req.query.address;
    const coordinates = await getAddressCoordinate(address);
    res.status(200).send(coordinates);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getDistance(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { origin, destination } = req.query;
    const distance = await getDistanceBetweenTwoLocations(origin, destination);
    res.status(200).send(distance);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getAutoSuggestion(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const input = req.query.input;
    const suggestions = await getAutoSuggestions(input);
    res.status(200).send(suggestions);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
