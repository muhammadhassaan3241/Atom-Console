// modules
import { Permission, Role } from "../models/user.model.js";

// USER_SERVICES

// create 
export const create = async (model, email, rolename, body, callback) => {
    try {
        const user = await model.findOne({ where: email });

        (user !== null)
            ? callback(user, 409, "0", "User Already Exists")
            : (async () => {
                const newUser = await model.create(body)
                await Role.findOne({ where: rolename })
                    .then(async (role) => {
                        await newUser.setRole(role)
                    })

                callback(newUser, 200, "1", "User Created Successfully");
            })();

    } catch (error) {
        throw error
    }
}

// findAll
export const findAll = async (model, callback) => {
    try {
        const users = await model.findAll();
        users
            ? callback(users, 200, "1", "Users Found Successfully")
            : callback(users, 404, "0", "Users Not Found");

    } catch (error) {
        throw error
    }
}

// findOne
export const findOne = async (model, object, callback) => {
    try {
        const user = await model.findOne({
            where: object,
        });

        user ? callback(user, 200, "1", "User Found Successfully") : callback(user, 404, "0", "User Not Found");

    } catch (error) {
        throw error
    }
}

// findByIdAndUpdate
export const findByIdAndUpdate = async (model, userId, role, updatedUser, callback) => {
    try {
        const fields = updatedUser;
        const rolename = role;

        (rolename !== undefined)
            ? (async () => {
                const user = await model.findOne({ where: { id: userId } });
                (user === null)
                    ? callback(null, 404, "0", "User Not Found")
                    : (async () => {
                        const role = await Role.findOne({ where: { name: rolename } });
                        if (!role) {
                            return callback(null, 404, "0", "Role Not Found");
                        }
                        await user.setRole(role)
                        await user.update(fields)
                        callback(user, 200, "1", "User Updated Successfully");
                    })()
            })()
            : (async () => {
                const user = await model.findOne({ where: { id: userId } });
                await user.update(fields);
                return callback(user, 200, "1", "User Updated Successfully");
            })()

    } catch (error) {
        throw error
    }
}

// findByIdAndDelete
export const findByIdAndDelete = async (model, userId) => {
    try {
        await model.destroy({ where: { id: userId } });

    } catch (error) {
        throw error
    }
}


