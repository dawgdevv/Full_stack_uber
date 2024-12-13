import mongoose from "mongoose";

function connecToDb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB!");
    })
    .catch((error) => {
      console.log("Connection failed!", error);
    });
}

export default connecToDb;
