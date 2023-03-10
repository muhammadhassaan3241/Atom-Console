// package
import bcrypt from "bcrypt";

// module
import { User } from "../models/user.model.js";

// password authentication
export const authenticationMiddleware = async (request, response, next) => {
    try {
        await User.findOne({ where: { email: request.body.email } })
            .then((user) => {
                (user !== null)
                    ? (async () => {
                        const isMatched = await bcrypt.compare(request.body.password, user.password);
                        !isMatched
                            ? response.status(400).send({
                                status: "0",
                                message: "Invalid Credentials",
                            })
                            : next()
                    })()
                    : (async () => {
                        response.status(400).send({
                            status: "0",
                            message: "Invalid Credentials",
                        })
                    })()
            })
    } catch (error) {
        response.status(500).send({
            message: "Something Went Wrong",
        })
    }
}