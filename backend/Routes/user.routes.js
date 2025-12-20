import express from "express";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import { followUnfollowUser, getSuggestedUsers, getUserProfile, updateUser } from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.get("/profile/:username", protectRoute, getUserProfile);
userRoute.get("/suggested", protectRoute, getSuggestedUsers);
userRoute.post("/follow/:id", protectRoute, followUnfollowUser);
userRoute.post("/update", protectRoute, updateUser);

export default userRoute;
