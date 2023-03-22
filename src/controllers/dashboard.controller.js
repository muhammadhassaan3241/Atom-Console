
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

    }
}