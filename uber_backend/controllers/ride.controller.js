import {
  getFare,
  createRide,
  confirmRide,
  startRide,
  endRide,
} from "../services/ride.services.js";
import {
  getCaptainsInTheRadius,
  getAddressCoordinate,
} from "../services/maps.services.js";
import { validationResult } from "express-validator";
import { sendMessageToSocket } from "../socket.js";

export async function createRides(req, res, next) {
  try {
    const { pickup, destination, vehicleType } = req.body;

    // Create ride first
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    // Then look for captains
    const pickupCoordinates = await getAddressCoordinate(pickup);

    // Try with increasing radius if no captains found
    let radius = 5; // Start with 5km
    let captains = [];

    while (radius <= 15 && captains.length === 0) {
      // Try up to 15km
      captains = await getCaptainsInTheRadius(
        pickupCoordinates.lat,
        pickupCoordinates.lng,
        radius
      );
      radius += 5;
    }

    if (!captains || captains.length === 0) {
      // Don't return 404, instead return the ride with a message
      return res.status(200).json({
        ride,
        message: "No captains available nearby. Please try again later.",
      });
    }

    // Notify available captains
    const availableCaptains = captains.filter(
      (captain) => captain.status === "online" && captain.socketId
    );

    console.log(`Found ${availableCaptains.length} available captains`);

    if (availableCaptains.length > 0) {
      availableCaptains.forEach((captain) => {
        sendMessageToSocket(captain.socketId, {
          event: "new-ride",
          data: {
            ...ride.toObject(),
            user: req.user,
          },
        });
      });
    }

    res.status(200).json(ride);
  } catch (error) {
    console.error("Ride creation error:", error);
    res.status(500).json({ message: error.message });
  }
}

export async function getFares(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { pickup, destination } = req.query;
    const fare = await getFare(pickup, destination);
    res.status(200).send(fare);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function confirmRides(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await confirmRide({ rideId, captain: req.captain });

    sendMessageToSocket(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

export async function startRides(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await startRide({ rideId, otp, captain: req.captain });

    console.log(ride);

    sendMessageToSocket(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function endRides(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await endRide({ rideId, captain: req.captain });

    sendMessageToSocket(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
