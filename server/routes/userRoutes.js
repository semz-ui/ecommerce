import express from "express";
import {
  login,
  register,
  sendOtp,
  updateUser,
  verifyUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/send-token", protect, sendOtp);
router.post("/verify-user", protect, verifyUser);
router.patch("/update-user", protect, updateUser);

export default router;
