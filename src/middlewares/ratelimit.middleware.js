// package
import rateLimit from "express-rate-limit";

// api rate limiting
export const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    handler: (request, response, next) => {
        return response
            .status(429)
            .json({
                error: "Too many requests in one minute, try later!"
            })
    }
}) 