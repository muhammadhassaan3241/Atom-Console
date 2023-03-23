// packages
import jwt from "jsonwebtoken";

// modules
import { User } from "../models/user.model.js";
import {
    create,
    findAll,
    findOne,
    findByIdAndUpdate,
    findByIdAndDelete
} from "../services/user.services.js";

// USER_CRUD

// create user
export const createUser = async (request, response) => {
    try {
        const requestBody = request.body;

        const email = { email: request.body.email };

        const rolename = { name: request.body.role };

        create(User, email, rolename, requestBody, (data, statusCode, customStatus, message) => {
            return data
                ? response.status(statusCode).send({
                    status: customStatus,
                    message: message,
                    data: data
                })
                : response.status(statusCode).send({
                    status: customStatus,
                    message: message,
                    data: data,
                });
        })
    } catch (error) {
        return response.status(500).send({
            message: "Something Went Wrong"
        })
    }
}

// login user
export const loginUser = async (request, response) => {
    try {
        const payload = { email: request.body.email };
        const user = await User.findOne({ where: payload })
        const options = { expiresIn: "1h" }
        const token = jwt.sign(payload, process.env.AUTH_SECRET_KEY, options);


        return response.status(200).send({
            status: "1",
            message: "User Successfully Logged In",
            data: user,
            token: token
        })

    } catch (error) {
        return response.status(500).send({
            message: "Something Went Wrong"
        })
    }
}

// get user by id
export const getUserById = async (request, response) => {
    try {
        const userId = { id: request.params.id };

        findOne(User, userId, (data, statusCode, customStatus, message) => {
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
            message: "Something Went Wrong"
        })
    }
}

// get all users
export const getUsers = async (request, response) => {
    try {
        findAll(User, (data, statusCode, customStatus, message) => {

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
            message: "Something Went Wrong"
        })
    }
}

// update a user
export const updateUser = async (request, response) => {
    try {
        const requestBody = request.body;

        const userId = request.params.id;

        const role = request.body.role;

        findByIdAndUpdate(User, userId, role, requestBody, (data, statusCode, customStatus, message) => {
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
            message: "Something Went Wrong"
        })
    }
}

// delete a user
export const deleteUser = async (request, response) => {
    try {
        // user id from params
        const userId = request.params.id;

        const user = findByIdAndDelete(User, userId);

        return user
            ? response.status(200).send({
                status: "1",
                message: "User Deleted Successfully",
            })
            : response.status(400).send({
                status: "0",
                message: "Invalid User Id",
            });

    } catch (error) {
        return response.status(500).send({
            message: "Something Went Wrong"
        })
    }
}

