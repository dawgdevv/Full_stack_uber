import userModel from "../models/user.model.js";

export async function createUser({ firstname, lastname, email, password }) {
  if (!firstname || !lastname || !email || !password) {
    throw new Error("All fields are required");
  }
  return userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });
}
