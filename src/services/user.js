const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const { User, Role } = require("../models/user");
const UserRepository = require("../repositories/crud");

const crudInstance = new UserRepository();

module.exports = {

    getUsers: async (resellerId, callback) => {
        try {
            const filteredQuery = {};
            const users = await crudInstance.findAll(User, filteredQuery);
            return callback(users);

        } catch (error) {
            let code = statusCode.notFound;
            let message = headerMessage.notFound;
            return { code, message }
        }
    },

    getUserByResellerId: async (resellerId, callback) => {
        try {

            const filteredQuery = { where: { reseller_id: resellerId } };
            const user = await crudInstance.findOne(User, filteredQuery);
            return callback(user);

        } catch (error) {
            let code = statusCode.notFound;
            let message = headerMessage.notFound;
            return { code, message }
        }
    },

    createNewUser: async (resellerId, formData, callback) => {
        try {

            const roleName = { name: formData.role };
            const roleFilteredQuery = { where: roleName };
            const newUser = await crudInstance.create(User, formData);
            const role = await crudInstance.findOne(Role, roleFilteredQuery);
            await newUser.setRole(role);
            return callback(newUser);

        } catch (error) {
            let code = statusCode.notFound;
            let message = headerMessage.notFound;
            return { code, message }
        }
    },

    updateUser: async (resellerId, formData, userId, callback) => {
        try {

            const userFilteredQuery = { where: { id: userId } };
            const roleFilteredQuery = { where: { name: formData.role } };

            if (formData.role !== null && formData.role !== undefined) {
                const user = await crudInstance.findOne(User, userFilteredQuery);
                if (user !== null && user !== undefined) {

                    const role = await crudInstance.findOne(Role, roleFilteredQuery);
                    await crudInstance.setRole(user, role)
                    await crudInstance.update(formData)
                    return callback(user);

                } else {
                    return callback()
                }
            }

            const user = await crudInstance.findOne(User, userFilteredQuery);
            if (user !== null && user !== undefined) {

                await crudInstance.update(formData);
                return callback(user);

            } else {
                return callback()
            }


        } catch (error) {
            let code = statusCode.notFound;
            let message = headerMessage.notFound;
            return { code, message }
        }
    },

    getUsers: async (resellerId, userId, callback) => {
        try {
            const filteredQuery = { where: { id: userId } };
            const user = await crudInstance.delete(User, filteredQuery);
            return callback(user);

        } catch (error) {
            let code = statusCode.notFound;
            let message = headerMessage.notFound;
            return { code, message }
        }
    },

}