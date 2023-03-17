// modules
import { Sequelize } from "sequelize";
import { Permission } from "../models/user.model.js";

// ROLE_SERVICES

// create 
export const create = async (model, rolename, permissions, body, callback) => {
    try {
        const role = await model.findOne({ where: rolename });

        (role !== null)
            ? callback(role, 409, "0", "Role Already Exists")
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

                callback(role, 200, "1", "Role Created Successfully");
            })();

    } catch (error) {
        throw error
    }
}

// findAll
export const findAll = async (model, callback) => {
    try {
        await model.findAll()
            .then((roles) => {
                (roles !== null)
                    ? callback(roles, 200, "1", "Roles Found Successfully")
                    : callback(roles, 404, "0", "Roles Not Found")
            })

    } catch (error) {
        throw error
    }
}

// findOne
export const findOne = async (model, object, callback) => {
    try {
        await model.findOne({
            where: object,
            include: [Permission]
        }).then((role) => {
            (role !== null)
                ? callback(role, 200, "1", "Role Found Successfully")
                : callback(role, 404, "1", "Role Not Found");
        })

    } catch (error) {
        throw error
    }
}

// findByIdAndUpdate
export const findByIdAndUpdate = async (model, roleId, permissions, body, callback) => {
    try {
        const fields = body;
        const permissionArray = permissions;

        (permissionArray !== null)
            ? (async () => {
                const role = await model.findOne({ where: { id: roleId } });
                (role === null)
                    ? callback(null, 404, "0", "Role Not Found")
                    : (async () => {
                        await role.setPermissions(permissions)
                        await role.update(fields)
                        callback(role, 200, "1", "Role Updated Successfully");
                    })()
            })()
            : (async () => {
                const role = await model.findOne({ where: { id: roleId } });
                await role.update(fields);
                return callback(role, 200, "1", "Role Updated Successfully");
            })()

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


