import mongoose from "mongoose";

const BlacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

const BlacklistToken = mongoose.model("BlacklistToken", BlacklistTokenSchema);
export default BlacklistToken;
