// package
import rateLimit from "express-rate-limit";

// api rate limiting
export const apiRequestLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 200,
    handler: (request, response, next) => {
        return response
            .status(429)
            .send({
                error: "Too many requests in five minutes, try later!"
            })
    }
}) 