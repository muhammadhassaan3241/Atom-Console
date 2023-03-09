// modules
import { Sequelize } from "sequelize";
import { Permission } from "../models/user.model.js";

// ROLE_SERVICES

// create 
export const create = async (model, rolename, permissions, body, callback) => {
    try {
        const role = await model.findOne({ where: rolename });

        (role !== null)
            ? callback(role)
            : (async () => {
                const newRole = await model.create(body);
                await Permission.findAll({
                    where: {
                        name: {
                            [Sequelize.Op.in]: permissions
                        }
                    }
                }).then(async (permissions) => {
                    await newRole.setPermissions(permissions)
                })

                callback(role);
            })();


    } catch (error) {
        throw error
    }
}

// findAll
export const findAll = async (model, callback) => {
    try {
        const roles = await model.findAll();
        callback(roles)

    } catch (error) {
        throw error
    }
}

// findOne
export const findOne = async (model, object, callback) => {
    try {
        const role = await model.findOne({
            where: object,
            include: [Permission]
        });

        role ? callback(role) : callback(role);

    } catch (error) {
        throw error
    }
}

// findByIdAndUpdate
export const findByIdAndUpdate = async (model, roleId, updatedrole) => {
    try {
        const fields = updatedrole;

        await model.update(fields, { where: { id: roleId } });

    } catch (error) {
        throw error
    }
}

// findByIdAndDelete
export const findByIdAndDelete = async (model, roleId) => {
    try {
        await model.destroy({ where: { id: roleId } });

    } catch (error) {
        throw error
    }
}


