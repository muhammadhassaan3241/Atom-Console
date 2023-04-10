const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const dashboardServices = require("../services/dashboard");
const { restResponse, apiResponse } = require("./base");

module.exports = {
  getProtocolList: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      dashboardServices.protocolList(
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

  getSourceCountry: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      dashboardServices.sourceContry(
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

  getDestinationCountry: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      dashboardServices.destinationCountry(
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
};
