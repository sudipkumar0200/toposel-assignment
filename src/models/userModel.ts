import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  fullName: String,
  email: {
    type: String,
    require: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "Other"],
  },
  DOB: String,
  password: {
    type: String,
    required: true,
  },
  country: String,
});

export const user = mongoose.model("User", userSchema);
