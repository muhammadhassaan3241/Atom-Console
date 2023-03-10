// packages
import axios from "axios";

// modules
import { Permission } from "../models/user.model.js";
import {
    create,
    findAll,
    findOne,
    findByIdAndUpdate,
    findByIdAndDelete
} from "../services/permission.services.js";

// PERMISSION_CRUD

// create permission
export const createPermission = async (request, response) => {
    try {

        const requestBody = request.body;

        const permissionname = { name: request.body.name }

        create(Permission, permissionname, requestBody, (data) => {

            return data ? response.send(
                {
                    success: "response successful",
                    message: "permission already exists",
                    data: data
                }

            ) : response.send(
                {
                    success: "response successful",
                    message: "permission created",
                }
            );
        })
    } catch (error) {
        return response.status(404).send({
            failure: "response failed",
            message: "something went wrong"
        })
    }
}

// get permission by id
export const getPermissionById = async (request, response) => {
    try {
        // permission id
        const permissionId = { id: request.params.id };

        findOne(Permission, permissionId, (data) => {

            return data ? response.send(
                {
                    success: "response successful",
                    message: "permission found",
                    data: data
                }

            ) : response.send(
                {
                    failure: "response successful",
                    message: "permission not found",
                }
            );
        });
    } catch (error) {
        return response.status(404).send({
            failure: "response failed",
            message: "something went wrong"
        })
    }
}

// get all permissions
export const getPermissions = async (request, response) => {
    try {
        findAll(Permission, (data) => {

            return data ? response.send(
                {
                    success: "response successful",
                    message: "permissions found",
                    data: data
                }

            ) : response.send(
                {
                    failure: "response successful",
                    message: "permissions not found",
                }
            );
        });

    } catch (error) {
        return response.status(404).send({
            failure: "response failed",
            message: "something went wrong"
        })
    }
}

// update a permission
export const updatePermission = async (request, response) => {
    try {
        const requestBody = request.body;

        const permissionId = request.params.id;

        const permission = findByIdAndUpdate(Permission, permissionId, requestBody);

        return permission
            ? response.send(
                {
                    success: "response successful",
                    message: "permission updated",
                }
            )

            : response.send(
                {
                    failure: "response successful",
                    message: "permission not updated",
                }
            );

    } catch (error) {
        return response.status(404).send({
            failure: "response failed",
            message: "something went wrong"
        })
    }
}

// delete a permission
export const deletePermission = async (request, response) => {
    try {
        const permissionId = request.params.id;

        const permission = findByIdAndDelete(Permission, permissionId);

        return permission
            ? response.send(
                {
                    success: "response successful",
                    message: "permission deleted",
                }
            )

            : response.send(
                {
                    failure: "response successful",
                    message: "permission not deleted",
                }
            );

    } catch (error) {
        return response.status(404).send({
            failure: "response failed",
            message: "something went wrong"
        })
    }
}

