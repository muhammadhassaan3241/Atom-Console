// package


// module
import { Op } from "sequelize";
import { Permission, Role, User } from "../models/user.model.js";

// authorization middleware function
export class Permissions {
    static read(user) {
        return user.permissions.includes("Read")
    }

    static write(user) {
        return user.permissions.includes("Write")
    }

    static edit(user) {
        return user.permissions.includes("Edit")
    }

    static remove(user) {
        return user.permissions.includes("Remove")
    }
}

export const authorizationMiddleware = async (request, response, next) => {
    try {

        const user = request.user;
        const role = request.user.Role.name;
        const roleArray = Array.isArray(role) ? user.Role : [user.Role]
        const permissions = request.user.Role.Permissions.map((p) => { return p.name });

        (user && roleArray.length > 0 && roleArray[0].Permissions.length === permissions.length)
            ? next()
            : response.status(403).send({
                failure: "response failed",
                message: "unauthorized "
            });


    } catch (error) {
        throw error
    }
}