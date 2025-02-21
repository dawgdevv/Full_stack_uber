import UserModel from "./models/user.model.js";
import CaptainModel from "./models/captain.model.js";

let io;

function initializeSocket(socketIO) {
  io = socketIO;
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        const user = await UserModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
        if (!user) {
          console.log("User not found");
          return;
        }
      } else if (userType === "captain") {
        const captain = await CaptainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
        if (!captain) {
          console.log("Captain not found");
          return;
        }
      } else {
        console.log("Invalid user type");
        return;
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      try {
        if (!location || !location.lat || !location.lng) {
          return socket.emit("error", { message: "Invalid location" });
        }

        const captain = await CaptainModel.findByIdAndUpdate(
          userId,
          {
            location: {
              type: "Point",
              coordinates: [location.lng, location.lat],
            },
            status: "online", // Update status when location is updated
          },
          { new: true }
        );

        if (!captain) {
          console.log("Captain not found");
          return;
        }

        console.log(`Updated captain ${userId} location`);
      } catch (error) {
        console.error("Error updating captain location:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}

function sendMessageToSocket(socketId, { event, data }) {
  if (io) {
    io.to(socketId).emit(event, data);
  } else {
    console.error("Socket.io not initialized");
  }
}

export { initializeSocket, sendMessageToSocket };
