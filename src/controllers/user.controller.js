// packages
import jwt from "jsonwebtoken";

// modules
import { User } from "../models/user.model.js";
import { create, findAll, findOne, findByIdAndUpdate, findByIdAndDelete } from "../services/user.services.js";

// USER_CRUD

// create user
export const createUser = async (request, response) => {
    try {
        const requestBody = request.body;

        // username
        const email = { email: request.body.email };
        const rolename = { name: request.body.role };

        create(User, email, rolename, requestBody, (data) => {

            // if user found
            return data ? response.send(
                {
                    success: "response successful",
                    message: "user already exists",
                    data: data
                }

                // else create a new one
            ) : response.send(
                {
                    success: "response successful",
                    message: "user created",
                }
            );
        })
    } catch (error) {
        throw new Error(error)
    }
}

// login user
export const loginUser = async (request, response) => {
    try {
        const payload = { email: request.body.email };
        const options = { expiresIn: "1h" }
        const authToken = jwt.sign(payload, process.env.AUTH_SECRET_KEY, options);

        return response.status(200).send({
            success: "response successfull",
            message: "authentication successfull",
            action: "user successfully logged in",
            token: authToken,
        })
    } catch (error) {
        throw error
    }
}

// get user by id
export const getUserById = async (request, response) => {
    try {
        // user id
        const userId = { id: request.params.id };

        // find a user by id and return 
        findOne(User, userId, (data) => {

            // if user found
            return data ? response.send(
                {
                    success: "response successful",
                    message: "user found",
                    data: data
                }

                // else not found
            ) : response.send(
                {
                    failure: "response successful",
                    message: "user not found",
                }
            );
        });
    } catch (error) {
        throw error
    }
}

// get all users
export const getUsers = async (request, response) => {
    try {
        findAll(User, (data) => {

            return data ? response.send(
                {
                    success: "response successful",
                    message: "users found",
                    data: data
                }

            ) : response.send(
                {
                    failure: "response successful",
                    message: "users not found",
                }
            );
        });

    } catch (error) {
        throw error
    }
}

// update a user
export const updateUser = async (request, response) => {
    try {
        // request body
        const requestBody = request.body;

        // user id from params
        const userId = request.params.id;

        // find user in db and update
        const user = findByIdAndUpdate(User, userId, requestBody);

        // if user found, update
        return user
            ? response.send(
                {
                    success: "response successful",
                    message: "user updated",
                }
            )

            // else not updated
            : response.send(
                {
                    failure: "response successful",
                    message: "user not updated",
                }
            );

    } catch (error) {
        throw error
    }
}

// delete a user
export const deleteUser = async (request, response) => {
    try {
        // user id from params
        const userId = request.params.id;

        // find user in db and delete
        const user = findByIdAndDelete(User, userId);

        // if user found, delete
        return user
            ? response.send(
                {
                    success: "response successful",
                    message: "user deleted",
                }
            )

            // else not deleted
            : response.send(
                {
                    failure: "response successful",
                    message: "user not deleted",
                }
            );

    } catch (error) {
        throw error
    }
}

export const getData = async (request, response) => {
    try {
        response.send({ data: request.apiResponse })
    } catch (error) {
        throw error
    }
}