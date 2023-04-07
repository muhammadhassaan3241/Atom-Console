const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const vpnAccountManagementServices = require("../services/vpn-account-management");
const { apiResponse } = require("./base");

module.exports = {
  getVpnAccountStatus: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      vpnAccountManagementServices.getVpnAccount(resellerId, (data) => {
        if (data !== undefined || data !== null) {
          return;
        } else {
          return;
        }
      });
    } catch (error) {
      return;
    }
  },

  createVpnAccount: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      vpnAccountManagementServices.createVpnAccount(resellerId, (data) => {
        if (data !== undefined || data !== null) {
          return;
        } else {
          return;
        }
      });
    } catch (error) {
      return;
    }
  },

  deleteVpnAccount: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      vpnAccountManagementServices.deleteVpnAccount(resellerId, (data) => {
        if (data !== undefined || data !== null) {
          return;
        } else {
          return;
        }
      });
    } catch (error) {
      return;
    }
  },

  renewVpnAccount: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      vpnAccountManagementServices.renewVpnAccount(resellerId, (data) => {
        if (data !== undefined || data !== null) {
          return;
        } else {
          return;
        }
      });
    } catch (error) {
      return;
    }
  },

  extendExpiryOfVpnAccount: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      vpnAccountManagementServices.extendExpiryOfVpnAccount(
        resellerId,
        (data) => {
          if (data !== undefined || data !== null) {
            return response.status(statusCode.success).json({
              status: "1",
              message: headerMessage.success,
            });
          } else {
            return response.status(statusCode.notFound).json({
              status: "0",
              message: headerMessage.notFound,
            });
          }
        }
      );
    } catch (error) {
      return;
    }
  },

  updatePreferenceOfVpnAccount: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      vpnAccountManagementServices.updatePreferenceOfVpnAccount(
        resellerId,
        (data) => {
          if (data !== undefined || data !== null) {
            return response.status(statusCode.success).json({
              status: "1",
              message: headerMessage.success,
            });
          } else {
            return response.status(statusCode.notFound).json({
              status: "0",
              message: headerMessage.notFound,
            });
          }
        }
      );
    } catch (error) {
      return;
    }
  },

  changePasswordOfVpnAccount: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      vpnAccountManagementServices.changePasswordOfVpnAccount(
        resellerId,
        (data) => {
          if (data !== undefined || data !== null) {
            return response.status(statusCode.success).json({
              status: "1",
              message: headerMessage.success,
            });
          } else {
            return response.status(statusCode.notFound).json({
              status: "0",
              message: headerMessage.notFound,
            });
          }
        }
      );
    } catch (error) {
      return;
    }
  },

  enableOrDisableVpnAccount: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      vpnAccountManagementServices.enableOrDisableVpnAccount(
        resellerId,
        (data) => {
          if (data !== undefined || data !== null) {
            return response.status(statusCode.success).json({
              status: "1",
              message: headerMessage.success,
            });
          } else {
            return response.status(statusCode.notFound).json({
              status: "0",
              message: headerMessage.notFound,
            });
          }
        }
      );
    } catch (error) {
      return;
    }
  },

  getVpnUserInventory: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      vpnAccountManagementServices.getVpnUserInventory(resellerId, (data) => {
        if (data !== undefined || data !== null) {
          return;
        } else {
          return;
        }
      });
    } catch (error) {
      return;
    }
  },

  getVpnUsers: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      vpnAccountManagementServices.getVpnUsers(resellerId, (data) => {
        if (data !== undefined || data !== null) {
          return;
        } else {
          return;
        }
      });
    } catch (error) {
      return;
    }
  },

  getVpnUsers: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      await vpnAccountManagementServices.getAllServiceTypes(
        resellerId,
        (data) => {
          if (data !== undefined || data !== null) {
            return apiResponse(
              response,
              200,
              "1",
              "Service Type Found Successfully",
              data
            );
          } else {
            return apiResponse(
              response,
              404,
              "1",
              "Service Type Not Found",
              []
            );
          }
        }
      );
    } catch (error) {
      return apiResponse(response, 500, "0", "Internal Server Error", null);
    }
  },
};
