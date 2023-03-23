
import Dashboard from "../services/dashboard.services.js";

export const getMonthlyConnectedUsers = (request, response) => {
    try {

        const reseller_id = request.user.reseller_id;

        Dashboard.getMonthlyConnectedUsers(reseller_id, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        });
    } catch (error) {
        return response
            .status(500)
            .send({
                status: "0",
                message: "Internal Server Error",
            })
    }
}

export const getProtocolList = (request, response) => {

    try {

        const reseller_id = request.user.reseller_id;

        Dashboard.getProtocolList(reseller_id, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        });
    } catch (error) {
        return response
            .status(500)
            .send({
                status: "0",
                message: "Internal Server Error",
            })
    }
}

export const getUserSourceCountry = (request, response) => {

    try {

        const reseller_id = request.user.reseller_id;

        Dashboard.getUserSourceContry(reseller_id, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        });
    } catch (error) {
        return response
            .status(500)
            .send({
                status: "0",
                message: "Internal Server Error",
            })
    }
}

export const getUserDestinationCountry = (request, response) => {

    try {

        const reseller_id = request.user.reseller_id;

        Dashboard.getUserDestinationCountry(reseller_id, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        });
    } catch (error) {
        return response
            .status(500)
            .send({
                status: "0",
                message: "Internal Server Error",
            })
    }
}