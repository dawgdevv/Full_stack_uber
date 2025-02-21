import app from "./app.js";
import { initializeSocket } from "./socket.js";
import { createServer } from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173", // Local development
      "https://full-stack-uber.vercel.app", // Replace with your Vercel frontend domain
      "https://uberbackend-7b382822789e.herokuapp.com", // Heroku backend domain
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

initializeSocket(io);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
