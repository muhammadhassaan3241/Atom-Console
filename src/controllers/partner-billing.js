const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const partnerBillingServices = require("../services/partner-billing");
const { restResponse } = require("./base");

module.exports = {

    getBillingInvoices: async (request, response) => {
        try {

            const resellerId = request.reseller_id;

            partnerBillingServices.getBillingInvoices(resellerId, (data) => {
                if (data !== undefined && data !== null) {
                    return restResponse(
                        response,
                        statusCode.success,
                        headerMessage.success,
                        { data })
                }
                else {
                    return restResponse(
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

    getActiveVpnUsers: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            const queryStrings = request.query;

            partnerBillingServices.getActiveVpnUsers(resellerId, queryStrings, (data) => {
                if (data !== undefined && data !== null) {
                    return restResponse(
                        response,
                        statusCode.success,
                        headerMessage.success,
                        { data })
                }
                else {
                    return restResponse(
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

    getConnectedVpnUsers: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            partnerBillingServices.getConnectedVpnUsers(resellerId, (data) => {
                if (data !== undefined && data !== null) {
                    return restResponse(
                        response,
                        statusCode.success,
                        headerMessage.success,
                        { data })
                }
                else {
                    return restResponse(
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

    getVpnBillingEstimation: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            const queryStrings = request.query;
            partnerBillingServices.getVpnBillingEstimation(resellerId, queryStrings, (data) => {
                if (data !== undefined || data !== null) {
                    return restResponse(
                        response,
                        statusCode.success,
                        headerMessage.success,
                        { data })
                }
                else {
                    return restResponse(
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
    }

}

