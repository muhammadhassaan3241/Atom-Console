// packages
import express from "express";
const router = express.Router();

// module
import { authenticationMiddleware } from "../middlewares/compare-pass.middleware.js";
import { loginUser } from "../controllers/user.controller.js";
import { refreshToken } from "../middlewares/auth.middleware.js";

// login routes
router
    .post("/admin/login", authenticationMiddleware, loginUser);

export default router;