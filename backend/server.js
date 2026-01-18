import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";
import postRoutes from "./Routes/post.routes.js";
import notificationRoutes from "./Routes/notification.routes.js";
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
const __dirname = path.resolve(); // * I basically do this when i deploy it

// === MIDDLEWARES ===
// ! Limit shouldn't be too high to prevent DOS
app.use(express.json({ limit: "5mb" })); // To parese req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// === MIDDLEWARES ===

// === MIDDLEWARE ROUTES ===
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// ! For other than the routes above, we gonna hit this endpoint (show the react application)
// * Also done when you deploy the app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
// === MIDDLEWARE ROUTES ===

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectMongoDB();
});
