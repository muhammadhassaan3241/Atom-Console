// package
import jwt from "jsonwebtoken";

// module
import { Permission, Role, User } from "../models/user.model.js";

export const jwtVerification = async (request, response, next) => {
    try {
        const authToken = request.headers['authorization']?.split(' ')[1];
        const decodedToken = jwt.verify(authToken, process.env.AUTH_SECRET_KEY);
        const user = await User.findOne({
            where: { email: decodedToken.email },
            attributes: { exclude: ["password"] },
            include: [{
                model: Role,
                attributes: ['name'],
                include: [{
                    model: Permission,
                    attributes: ['name']
                }]
            }]
        })
        decodedToken ? (async () => {
            request.user = user;;
            next()
        })()
            : response.status(400).send({
                failure: "response failed",
                message: "authentication failed",
            })

    } catch (error) {
        throw error
    }
}

export const refreshToken = async (request, response, next) => {
    try {
        const userEmail = request.userDetails.email;
        const accessToken = request.authToken;

        !accessToken
            ? response.status(404).send({
                failure: 'response failed',
                message: 'access token is missing',
            })
            : ((async () => {
                const decodedToken = jwt.verify(
                    accessToken,
                    process.env.AUTH_SECRET_KEY
                );
                const user = await User.findOne({
                    where: { token: decodedToken },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [{ model: Role, include: [Permission] }]
                });
                user !== null && decodedToken.exp < Date.now() / 1000
                    ? (async () => {
                        const payload = { userEmail };
                        const options = { expiresIn: '7d' };
                        const newAuthToken = jwt.sign(
                            payload,
                            process.env.AUTH_SECRET_KEY,
                            options
                        );

                        request.userDetails.token = newAuthToken;
                        await request.userDetails.save();
                        request.refreshToken = newAuthToken;
                    })()
                    : null;
            })(),
                next());
    } catch (error) {
        next(error);
    }
};






