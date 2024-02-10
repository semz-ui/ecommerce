import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
  {
    email: {
      type: "String",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  { expireAfterSeconds: 60 }
);

const Token = mongoose.model("Token", tokenSchema);
export default Token;
