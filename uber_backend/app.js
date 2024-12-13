import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connecToDb from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";

const app = express();

connecToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

export default app;
