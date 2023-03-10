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

        create(User, email, rolename, requestBody, (data) => {
            return data
                ? response.status(409).send({
                    status: "0",
                    message: "User Already Exists",
                    data: data
                })
                : response.status(200).send({
                    status: "1",
                    message: "User Created Successfully",
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

        findOne(User, userId, (data) => {
            return data
                ? response.status(200).send({
                    status: "1",
                    message: "User Found Successfully",
                    data: data
                })
                : response.status(404).send({
                    status: "0",
                    message: "User Not Found",
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
        findAll(User, (data) => {

            return data
                ? response.status(200).send({
                    status: "1",
                    message: "Users Found Successfully",
                    data: data
                })
                : response.status(404).send({
                    status: "0",
                    message: "Users Not Found",
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

        const user = findByIdAndUpdate(User, userId, requestBody);

        return user
            ? response.status(200).send({
                status: "1",
                message: "User Updated Successfully",
                data: user
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

// delete a user
export const deleteUser = async (request, response) => {
    try {
        // user id from params
        const userId = request.params.id;

        console.log(userId);

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

