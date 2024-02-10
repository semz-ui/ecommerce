import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add your firstName"],
    },
    lastName: {
      type: String,
      required: [true, "Please add your lastName"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    role: {
      type: String,
      required: [true, "Please add a role"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
