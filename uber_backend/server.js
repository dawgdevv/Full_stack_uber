import app from "./app.js";
import { initializeSocket } from "./socket.js";
import { createServer } from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://gnpnxv54-5173.inc1.devtunnels.ms/",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

initializeSocket(io);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
