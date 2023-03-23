
// modules
import Billing from "../services/billing.services.js";

// INVOICE_APIs

// get all invoices
export const getInvoices = async (request, response) => {
    try {
        Billing.getInvoices((data, statusCode, customStatus, message) => {
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

// get all active user
export const getVpnActiveUsers = async (request, response) => {
    try {
        const query_strings = request.query;
        const reseller_id = request.user.reseller_id;
        Billing.getVpnActiveUsers(query_strings, reseller_id, (data, statusCode, customStatus, customMessage,) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data,
                })
        });

    } catch (error) {
        return response
            .status(500)
            .send({
                status: "0",
                message: "Internal Server Error"
            })
    };
}

// get all connected user
export const getVpnConnectedUsers = async (request, response) => {
    try {
        const query_strings = request.query;
        const reseller_id = request.user.reseller_id;
        Billing.getVpnConnectedUsers(query_strings, reseller_id, (data, statusCode, customStatus, customMessage,) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data,
                })
        });

    } catch (error) {
        return response
            .status(500)
            .send({
                status: "0",
                message: "Internal Server Error"
            })
    }
}

// get graph data
export const getGraphData = async (request, response) => {
    try {

        const reseller_id = request.user.reseller_id;
        const subscription_type = request.user.subscription;
        const query_strings = request.query;

        Billing.getGraphData(reseller_id, subscription_type, query_strings, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data,
                })
        })

    } catch (error) {
        return response.status(500).send({
            message: "Something Went Wrong"
        })
    }
}
