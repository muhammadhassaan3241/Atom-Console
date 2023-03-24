// package
import axios from "axios";
import jwt from "jsonwebtoken";

// module
import { Permission, Role, User } from "../models/user.model.js";
// import billing from "../services/billing.services.js"

// jwt token verification
export const jwtVerification = async (request, response, next) => {
    try {
        const authToken = request.headers['authorization']?.split(' ')[1];
        if (authToken !== null) {
            const decodedToken = jwt.verify(authToken, process.env.AUTH_SECRET_KEY || process.env.REFRESH_AUTH_KEY);
            const expiresIn = decodedToken.exp - Date.now() / 1000;
            const user = await User.findOne({
                where: { email: decodedToken?.email },
                attributes: { exclude: ["password", "parentkey"] },
                include: [{
                    model: Role,
                    attributes: ['name'],
                    include: [{
                        model: Permission,
                        attributes: ['name']
                    }]
                }]
            })
            user.token = authToken;
            await user.save();
            request.user = user;
            next()
        } else {
            return respond.status(401).send({
                status: "0",
                message: "Unauthorized, Back to Login"
            })
        }

    } catch (error) {
        response.status(403).send({
            message: "Forbidden",
        })
    }
}

// export const generateRefreshToken = async (request, response, next) => {
//     try {

//         const accessTokenHeaders = {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         }

//         await axios.get(`${process.env.ATOM_BASE_URL}/auth/v1/accessToken`, accessTokenHeaders)
//             .then(({ data }) => {
//                 const body = data.body;
//                 console.log(body);
//             })
//     } catch (error) {
//         return response
//             .status(500)
//             .send({
//                 status: "0",
//                 message: "Internal Server Error"
//             })
//     }
// }