const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const partnerBillingServices = require("../services/partner-billing");
const { apiResponse } = require("./base");

module.exports = {
  getBillingInvoices: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      partnerBillingServices.invoices(
        resellerId,
        (data, code, status, message) => {
          return apiResponse(response, code, status, message, data);
        }
      );
    } catch (error) {
      return apiResponse(
        response,
        statusCode.someThingWentWrong,
        "0",
        headerMessage.someThingWentWrong
      );
    }
  },

  getActiveVpnUsers: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const queryStrings = request.query;
      partnerBillingServices.getUsersList(
        resellerId,
        queryStrings,
        (data, code, status, message) => {
          return apiResponse(response, code, status, message, data);
        }
      );
    } catch (error) {
      return apiResponse(
        response,
        statusCode.someThingWentWrong,
        "0",
        headerMessage.someThingWentWrong
      );
    }
  },

  getConnectedVpnUsers: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      partnerBillingServices.getResellerConnectedUsersList(
        resellerId,
        (data, code, status, message) => {
          return apiResponse(response, code, status, message, data);
        }
      );
    } catch (error) {
      return apiResponse(
        response,
        statusCode.someThingWentWrong,
        "0",
        headerMessage.someThingWentWrong
      );
    }
  },

  getVpnBillingEstimation: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const queryStrings = request.query;
      const subscription = request.user.subscription;
      partnerBillingServices.getBillingEstimation(
        resellerId,
        queryStrings,
        subscription,
        (data, code, status, message) => {
          return apiResponse(response, code, status, message, data);
        }
      );
    } catch (error) {
      return apiResponse(
        response,
        statusCode.someThingWentWrong,
        "0",
        headerMessage.someThingWentWrong
      );
    }
  },
};
