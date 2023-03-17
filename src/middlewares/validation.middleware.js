// package
import { body, validationResult } from "express-validator";

// login validation
export const loginValidationMiddleware = [
    body("email").notEmpty().withMessage("email is required"),
    body("email").isEmail().withMessage("invalid email format"),
    body('password').notEmpty().withMessage("password is required")

];

// login validation error handler
export const loginValidationErroreHandler = async (request, response, next) => {
    const errors = validationResult(request);
    (!errors.isEmpty())
        ? response.status(400).send({
            status: "0",
            message: "Invalid Parameters",
            data: errors.array()
        })
        : next();
}
