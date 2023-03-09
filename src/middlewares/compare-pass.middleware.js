// package
import bcrypt from "bcrypt";

// module
import { User } from "../models/user.model.js";

// comparing password
export const authenticationMiddleware = async (request, response, next) => {
    try {
        await User.findOne({ where: { email: request.body.email } })
            .then((user) => {
                (user !== null)
                    ? (async () => {
                        const isMatched = await bcrypt.compare(request.body.password, user.password);
                        !isMatched
                            ? response.status(400).send({
                                failure: "response failed",
                                message: "invalid email or password",
                            })
                            : next()
                    })()
                    : (async () => {
                        response.status(400).send({
                            failure: "response failed",
                            message: "invalid email or password",
                            data: user
                        })
                    })()
            })
    } catch (error) {
        throw error
    }
}