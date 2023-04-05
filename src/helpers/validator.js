// package
import { body, validationResult } from 'express-validator';

export const loginValidationMiddleware = [
    body('email').notEmpty().withMessage('email is required'),
    body('email').isEmail().withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required'),
];

export const loginValidationErroreHandler = async (request, response, next) => {
    const errors = validationResult(request);
    !errors.isEmpty()
        ? response.status(400).send({
            message: 'Invalid Parameters',
            data: errors.array(),
        })
        : next();
};
