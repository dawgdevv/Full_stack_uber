import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connecToDb from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";
import mapRoutes from "./routes/maps.routes.js";
import rideRoutes from "./routes/ride.routes.js";

const app = express();
dotenv.config();
connecToDb();
const corsOptions = {
  origin: [
    "http://localhost:5173", // Local development
    "https://full-stack-uber.vercel.app", // Replace with your Vercel frontend domain
    "https://uberbackend-7b382822789e.herokuapp.com", // Heroku backend domain
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ message: "Invalid JSON" });
  }
  next();
});
export default app;
