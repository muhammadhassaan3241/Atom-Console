// modules
import { Permission, Role } from "../models/user.model.js";

// USER_SERVICES

// create 
export const create = async (model, email, rolename, body, callback) => {
    try {
        const user = await model.findOne({ where: email });

        (user !== null)
            ? callback(user)
            : (async () => {
                const newUser = await model.create(body)
                await Role.findOne({ where: rolename })
                    .then(async (role) => {
                        await newUser.setRole(role)
                    })

                callback(user);
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
            ? callback(users)
            : callback(users);

    } catch (error) {
        throw error
    }
}

// findOne
export const findOne = async (model, object, callback) => {
    try {
        const user = await model.findOne({
            where: object,
            include: [{ model: Role, include: [Permission] }]
        });

        user ? callback(user) : callback(user);

    } catch (error) {
        throw error
    }
}

// findByIdAndUpdate
export const findByIdAndUpdate = async (model, userId, updatedUser) => {
    try {
        const fields = updatedUser;

        await model.update(fields, { where: { id: userId } });

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


