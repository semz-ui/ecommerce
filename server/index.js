import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import cloudinaryRoutes from "./routes/cloudinaryRoutes.js";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", userRouter);
app.use("/items", itemRoutes);
app.use("/sign-image", cloudinaryRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
