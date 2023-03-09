// packages
import axios from "axios";
import bcrypt from "bcrypt";

// modules
import { Role } from "../models/user.model.js";
import { create, findAll, findOne, findByIdAndUpdate, findByIdAndDelete } from "../services/roles.services.js";

// ROLE_CRUD

// create role
export const createRole = async (request, response) => {
    try {

        const requestBody = request.body;

        const rolename = { name: request.body.name }
        const permissions = request.body.permissions;

        create(Role, rolename, permissions, requestBody, (data) => {

            return data ? response.send(
                {
                    success: "response successful",
                    message: "role already exists",
                    data: data
                }

            ) : response.send(
                {
                    success: "response successful",
                    message: "role created",
                }
            );
        })
    } catch (error) {
        throw error
    }
}

// get role by id
export const getRoleById = async (request, response) => {
    try {
        const roleId = { id: request.params.id };

        findOne(Role, roleId, (data) => {

            return data ? response.send(
                {
                    success: "response successful",
                    message: "role found",
                    data: data
                }

            ) : response.send(
                {
                    failure: "response successful",
                    message: "role not found",
                }
            );
        });
    } catch (error) {
        throw err
    }
}

// get all roles
export const getRoles = async (request, response) => {
    try {
        findAll(Role, (data) => {

            return data ? response.send(
                {
                    success: "response successful",
                    message: "roles found",
                    data: data
                }

            ) : response.send(
                {
                    failure: "response successful",
                    message: "roles not found",
                }
            );
        });

    } catch (error) {
        throw err
    }
}

// update a role
export const updateRole = async (request, response) => {
    try {
        const requestBody = request.body;

        const roleId = request.params.id;

        const role = findByIdAndUpdate(Role, roleId, requestBody);

        return role
            ? response.send(
                {
                    success: "response successful",
                    message: "role updated",
                }
            )

            : response.send(
                {
                    failure: "response successful",
                    message: "role not updated",
                }
            );

    } catch (error) {
        throw err
    }
}

// delete a role
export const deleteRole = async (request, response) => {
    try {
        const roleId = request.params.id;

        const role = findByIdAndDelete(Role, roleId);

        return role
            ? response.send(
                {
                    success: "response successful",
                    message: "role deleted",
                }
            )

            : response.send(
                {
                    failure: "response successful",
                    message: "role not deleted",
                }
            );

    } catch (error) {
        throw err
    }
}

