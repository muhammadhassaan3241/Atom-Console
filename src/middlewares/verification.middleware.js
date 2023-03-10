// package
import jwt from "jsonwebtoken";

// module
import { Permission, Role, User } from "../models/user.model.js";

// jwt token verification
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
            request.user = user;
            next()
        })()
            : (async () => {

            })()

    } catch (error) {
        response.status(500).send({
            message: "Something Went Wrong",
        })
    }
}

