const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const dashboardServices = require("../services/dashboard");
const { restResponse } = require("./base");


module.exports = {

    getMonthlyVpnConnectedUsers: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            dashboardServices.getMonthlyVpnConnectedUsers(resellerId, (data) => {
                console.log(data);
                if (data !== undefined && data !== null) {
                    return restResponse(
                        response,
                        statusCode.success,
                        headerMessage.success,
                        { data })
                }
                else {
                    restResponse(
                        response,
                        statusCode.notFound,
                        headerMessage.notFound,
                        { data })
                }
            })
        } catch (error) {
            return restResponse(
                response,
                statusCode.someThingWentWrong,
                headerMessage.someThingWentWrong,
                null
            )
        }
    },

    getProtocolList: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            dashboardServices.getProtocolList(resellerId, (data) => {
                if (data !== undefined && data !== null) {
                    return restResponse(
                        response,
                        statusCode.success,
                        headerMessage.success,
                        { data })
                }
                else {
                    restResponse(
                        response,
                        statusCode.notFound,
                        headerMessage.notFound,
                        { data })
                }
            })
        } catch (error) {
            return restResponse(
                response,
                statusCode.someThingWentWrong,
                headerMessage.someThingWentWrong,
                null
            )
        }
    },

    getSourceCountry: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            dashboardServices.getSourceContry(resellerId, (data) => {
                if (data !== undefined && data !== null) {
                    return restResponse(
                        response,
                        statusCode.success,
                        headerMessage.success,
                        { data })
                }
                else {
                    restResponse(
                        response,
                        statusCode.notFound,
                        headerMessage.notFound,
                        { data })
                }
            })
        } catch (error) {
            return restResponse(
                response,
                statusCode.someThingWentWrong,
                headerMessage.someThingWentWrong,
                null
            )
        }
    },

    getDestinationCountry: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            dashboardServices.getDestinationCountry(resellerId, (data) => {
                if (data !== undefined && data !== null) {
                    return restResponse(
                        response,
                        statusCode.success,
                        headerMessage.success,
                        { data })
                }
                else {
                    restResponse(
                        response,
                        statusCode.notFound,
                        headerMessage.notFound,
                        { data })
                }
            })
        } catch (error) {
            return restResponse(
                response,
                statusCode.someThingWentWrong,
                headerMessage.someThingWentWrong,
                null
            )
        }
    },

};
