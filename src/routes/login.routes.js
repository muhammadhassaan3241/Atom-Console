// packages
import express from "express";
const router = express.Router();

// module
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { loginUser } from "../controllers/user.controller.js";
import { loginValidationErroreHandler, loginValidationMiddleware } from "../middlewares/validation.middleware.js";
import { getUserSubscriptionType } from "../services/billing.services.js";

// login routes
router
    .post(
        "/admin/login",
        loginValidationMiddleware,
        loginValidationErroreHandler,
        authenticationMiddleware,
        getUserSubscriptionType,
        loginUser)

export default router;