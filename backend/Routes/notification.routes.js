import express from "express";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import { deleteNotifications, getNotifications } from "../controllers/notification.controller.js";

const notificationRoute = express.Router();

notificationRoute.get("/", protectRoute, getNotifications);
notificationRoute.delete("/", protectRoute, deleteNotifications);

export default notificationRoute;