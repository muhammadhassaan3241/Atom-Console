const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const partnerBillingServices = require("../services/partner-billing");
const { restResponse, apiResponse } = require("./base");

module.exports = {
  getBillingInvoices: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      partnerBillingServices.getBillingInvoices(
        resellerId,
        (data, code, status, message) => {
          if (data !== undefined && data !== null) {
            return apiResponse(response, code, status, message, data);
          } else {
            return apiResponse(response, code, status, message, []);
          }
        }
      );
    } catch (error) {
      return apiResponse(response, 500, "0", "Internal Server Error");
    }
  },

  getActiveVpnUsers: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const queryStrings = request.query;
      partnerBillingServices.getActiveVpnUsers(
        resellerId,
        queryStrings,
        (data, code, status, message) => {
          if (data !== undefined && data !== null) {
            return apiResponse(response, code, status, message, data);
          } else {
            return apiResponse(response, code, status, message, []);
          }
        }
      );
    } catch (error) {
      return apiResponse(response, 500, "0", "Internal Server Error");
    }
  },

  getConnectedVpnUsers: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      partnerBillingServices.getConnectedVpnUsers(
        resellerId,
        (data, code, status, message) => {
          if (data !== undefined && data !== null) {
            return apiResponse(response, code, status, message, data);
          } else {
            return apiResponse(response, code, status, message, []);
          }
        }
      );
    } catch (error) {
      return apiResponse(response, 500, "0", "Internal Server Error");
    }
  },

  getVpnBillingEstimation: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const queryStrings = request.query;
      partnerBillingServices.getVpnBillingEstimation(
        resellerId,
        queryStrings,
        (data, code, status, message) => {
          if (data !== undefined && data !== null) {
            return apiResponse(response, code, status, message, data);
          } else {
            return apiResponse(response, code, status, message, []);
          }
        }
      );
    } catch (error) {
      return apiResponse(response, 500, "0", "Internal Server Error");
    }
  },
};
