// packages
import axios from "axios";

// modules
import { Role } from "../models/user.model.js";
import {
    create,
    findAll,
    findOne,
    findByIdAndUpdate,
    findByIdAndDelete
} from "../services/roles.services.js";

// ROLE_CRUD

// create role
export const createRole = async (request, response) => {
    try {

        const requestBody = request.body;

        const rolename = { name: request.body.name }
        const permissions = request.body.permissions;

        create(Role, rolename, permissions, requestBody, (data) => {
            return data
                ? response.status().send({
                    status: "0",
                    message: "role already exists",
                    data: data
                })
                : response.send({
                    status: "1",
                    message: "role created successfully",
                });
        })

    } catch (error) {
        return response.status(500).send({
            message: "something went wrong"
        })
    }
}

// get role by id
export const getRoleById = async (request, response) => {
    try {
        const roleId = { id: request.params.id };

        findOne(Role, roleId, (data) => {
            return data
                ? response.send({
                    status: "1",
                    message: "role found successfully",
                    data: data
                })
                : response.send({
                    status: "0",
                    message: "role not found",
                });
        });
    } catch (error) {
        return response.status(500).send({
            message: "something went wrong"
        })
    }
}

// get all roles
export const getRoles = async (request, response) => {
    try {
        findAll(Role, (data) => {
            return data
                ? response.send({
                    status: "1",
                    message: "roles found successfully",
                    data: data
                })
                : response.send({
                    status: "0",
                    message: "roles not found",
                });
        });

    } catch (error) {
        return response.status(500).send({
            message: "something went wrong"
        })
    }
}

// update a role
export const updateRole = async (request, response) => {
    try {
        const requestBody = request.body;

        const roleId = request.params.id;

        const role = findByIdAndUpdate(Role, roleId, requestBody);

        return role
            ? response.send({
                status: "1",
                message: "role updated successfully",
            })
            : response.send({
                status: "0",
                message: "role not updated",
            });

    } catch (error) {
        return response.status(500).send({
            message: "something went wrong"
        })
    }
}

// delete a role
export const deleteRole = async (request, response) => {
    try {
        const roleId = request.params.id;

        const role = findByIdAndDelete(Role, roleId);

        return role
            ? response.send({
                status: "1",
                message: "role deleted successfully",
            })
            : response.send({
                status: "0",
                message: "role not deleted",
            });

    } catch (error) {
        return response.status(500).send({
            message: "something went wrong"
        })
    }
}

