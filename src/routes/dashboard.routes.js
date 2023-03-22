// packages
import { Router } from "express";
const router = Router();

// modules
import { getMonthlyConnectedUsers } from "../controllers/dashboard.controller.js";

// routes
router
    .get("/monthly-users/read", getMonthlyConnectedUsers)

export default router;