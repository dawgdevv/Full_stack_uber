import axios from "axios";
import CaptainModel from "../models/captain.model.js";

export async function getAddressCoordinate(address) {
  if (!address) {
    throw new Error("Address is required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    console.log(response.data); // Log the entire response for debugging

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      console.error(
        "Error from Google Maps API:",
        response.data.status,
        response.data.error_message
      );
      throw new Error("Could not find location");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw new Error(error.message);
  }
}

export async function getDistanceBetweenTwoLocations(origin, destination) {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    console.log(response.data); // Log the entire response for debugging
    if (response.data.status === "OK") {
      const distance = response.data.rows[0].elements[0];
      return distance;
    } else {
      console.error(
        "Error from Google Maps API:",
        response.data.status,
        response.data.error_message
      );
      throw new Error("Could not find distance");
    }
  } catch (error) {
    console.error("Error fetching distance:", error.message);
    throw new Error(error.message);
  }
}

export async function getAutoSuggestions(input) {
  if (!input) {
    throw new Error("Input is required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    console.log(response.data); // Log the entire response for debugging
    if (response.data.status === "OK") {
      const suggestions = response.data.predictions;
      return suggestions;
    } else {
      console.error(
        "Error from Google Maps API:",
        response.data.status,
        response.data.error_message
      );
      throw new Error("Could not find suggestions");
    }
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    throw new Error(error.message);
  }
}

export async function getCaptainsInTheRadius(lat, lng, radius) {
  if (!lat || !lng || !radius) {
    throw new Error("Latitude, longitude, and radius are required");
  }

  try {
    // Add 2dsphere index to captain location
    await CaptainModel.collection.createIndex({ location: "2dsphere" });

    const captains = await CaptainModel.find({
      status: "online",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat], // MongoDB expects [longitude, latitude]
          },
          $maxDistance: radius * 1000, // Convert km to meters
        },
      },
    });

    console.log(`Found ${captains.length} captains nearby`);
    return captains;
  } catch (error) {
    console.error("Error finding captains:", error);
    return [];
  }
}
