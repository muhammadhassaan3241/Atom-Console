const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const vpnAccountManagementServices = require("../services/vpn-account-management");
const { apiResponse } = require("./base");

module.exports = {
  getVpnAccountStatus: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const formData = request.body;
      vpnAccountManagementServices.status(
        resellerId,
        formData,
        (data, code, status, message) => {
          return apiResponse(response, code, status, message, data);
        }
      );
    } catch (error) {
      return apiResponse(
        response,
        statusCode.someThingWentWrong,
        "0",
        headerMessage.someThingWentWrong,
        undefined
      );
    }
  },

  createVpnAccount: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const formData = request.body;
      vpnAccountManagementServices.create(
        resellerId,
        formData,
        (data, code, status, message) => {
          return apiResponse(response, code, status, message, data);
        }
      );
    } catch (error) {
      return apiResponse(
        response,
        statusCode.someThingWentWrong,
        "0",
        statusCode.someThingWentWrong,
        data
      );
    }
  },

  deleteVpnAccount: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const formData = request.body;
      vpnAccountManagementServices.remove(
        resellerId,
        formData,
        (data, code, status, message) => {
          return apiResponse(response, code, status, message, data);
        }
      );
    } catch (error) {
      return apiResponse(
        response,
        statusCode.someThingWentWrong,
        "0",
        headerMessage.someThingWentWrong,
        data
      );
    }
  },

  renewVpnAccount: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const formData = request.body;
      vpnAccountManagementServices.renew(
        resellerId,
        formData,
        (data, code, status, message) => {
          return apiResponse(response, code, status, message, data);
        }
      );
    } catch (error) {
      return apiResponse(
        response,
        statusCode.someThingWentWrong,
        "0",
        headerMessage.someThingWentWrong,
        undefined
      );
    }
  },

  extendExpiryOfVpnAccount: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const formData = request.body;
      vpnAccountManagementServices.extendExpiry(
        resellerId,
        formData,
        (data, code, status, message) => {
          return apiResponse(response, code, status, message, data);
        }
      );
    } catch (error) {
      return apiResponse(
        response,
        statusCode.someThingWentWrong,
        "0",
        headerMessage.someThingWentWrong,
        undefined
      );
    }
  },

  updatePreferenceOfVpnAccount: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const formData = request.body;
      vpnAccountManagementServices.updatePreferences(
        resellerId,
        formData,
        (data, code, status, message) => {
          return apiResponse(response, code, status, message, data);
        }
      );
    } catch (error) {
      return apiResponse(
        response,
        statusCode.someThingWentWrong,
        "0",
        headerMessage.someThingWentWrong,
        undefined
      );
    }
  },

  changePasswordOfVpnAccount: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const formData = request.body;
      vpnAccountManagementServices.changePassword(
        resellerId,
        formData,
        (data, code, status, message) => {
          return apiResponse(response, code, status, message, data);
        }
      );
    } catch (error) {
      return apiResponse(
        response,
        statusCode.someThingWentWrong,
        "0",
        headerMessage.someThingWentWrong,
        undefined
      );
    }
  },

  enableOrDisableVpnAccount: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const formData = request.body;
      vpnAccountManagementServices.enableOrDisable(
        resellerId,
        formData,
        (data, code, status, message) => {
          return apiResponse(response, code, status, message, data);
        }
      );
    } catch (error) {
      return apiResponse(
        response,
        statusCode.someThingWentWrong,
        "0",
        headerMessage.someThingWentWrong,
        undefined
      );
    }
  },

  getVpnUserInventory: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      vpnAccountManagementServices.getResellerInventory(
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
        headerMessage.someThingWentWrong,
        undefined
      );
    }
  },

  getVpnUsers: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      vpnAccountManagementServices.listUsers(
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
        headerMessage.someThingWentWrong,
        undefined
      );
    }
  },

  getServices: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      await vpnAccountManagementServices.getAllServiceTypes(
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
        headerMessage.someThingWentWrong,
        undefined
      );
    }
  },
};
