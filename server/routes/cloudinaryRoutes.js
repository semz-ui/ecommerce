import express from "express";

import { generateSignature } from "../controllers/cloudinaryController.js";

const router = express.Router();

router.post("/", generateSignature);

export default router;
