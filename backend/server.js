import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./Routes/auth.routes.js";
import connectMongoDB from "./database/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// === MIDDLEWARES ===
app.use(express.json()); // To parese req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// === MIDDLEWARES ===

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectMongoDB();
});
