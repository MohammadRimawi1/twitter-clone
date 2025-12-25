import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";
import postRoutes from "./Routes/post.routes.js";
import connectMongoDB from "./database/connectMongoDB.js";

dotenv.config();

//* We now connected our cloudinary account so we can upload and delete images *
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;

// === MIDDLEWARES ===
app.use(express.json()); // To parese req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// === MIDDLEWARES ===

// === MIDDLEWARE ROUTES ===
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
// === MIDDLEWARE ROUTES ===

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectMongoDB();
});
