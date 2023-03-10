// packages
import express from "express";
const router = express.Router();

// module
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { loginUser } from "../controllers/user.controller.js";
import { loginValidationErroreHandler, loginValidationMiddleware } from "../middlewares/validation.middleware.js";

// login routes
router
    .post(
        "/admin/login",
        loginValidationMiddleware,
        loginValidationErroreHandler,
        authenticationMiddleware,
        loginUser)

export default router;