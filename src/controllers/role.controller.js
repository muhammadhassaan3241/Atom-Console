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

        create(Role, rolename, permissions, requestBody, (data, statusCode, customMessage, message) => {
            return data
                ? response.status(statusCode).send({
                    status: customMessage,
                    message: message,
                    data: data
                })
                : response.status(statusCode).send({
                    status: customMessage,
                    message: message,
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

        findOne(Role, roleId, (data, statusCode, customMessage, message) => {
            return (data !== null)
                ? response.status(statusCode).send({
                    status: customMessage,
                    message: message,
                    data: data
                })
                : response.status(statusCode).send({
                    status: customMessage,
                    message: message,
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
        findAll(Role, (data, statusCode, customMessage, message) => {
            return (data !== null)
                ? response.status(statusCode).send({
                    status: customMessage,
                    message: message,
                    data: data
                })
                : response.status(statusCode).send({
                    status: customMessage,
                    message: message,
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

        const permissions = request.body.permissions;

        findByIdAndUpdate(Role, roleId, permissions, requestBody, (data, statusCode, customStatus, message) => {
            return (data !== null)
                ? response.status(statusCode).send({
                    status: customStatus,
                    message: message,
                    data: data
                })
                : response.status(statusCode).send({
                    status: customStatus,
                    message: message,
                });
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

