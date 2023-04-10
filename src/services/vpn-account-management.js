const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const { getAccessToken } = require("../constants/redis");
const {
  atomInventoryInstance,
  atomVamInstance,
} = require("../repositories/atom");

module.exports = {
  status: async (resellerId, formData, callback) => {
    try {
      const accessToken = await getAccessToken(resellerId);
      const status = await atomVamInstance.status(formData, {
        "Content-Type": "application/json",
        "X-AccessToken": accessToken,
      });
      if (
        status.body &&
        status.body !== undefined &&
        status.body !== null &&
        Object.keys(status.body).length !== 0
      ) {
        return callback(
          status.body,
          statusCode.success,
          "1",
          status.header.message
        );
      } else {
        return callback(
          status.body,
          statusCode.notFound,
          "0",
          status.header.message
        );
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  remove: async (resellerId, formData, callback) => {
    try {
      const accessToken = await getAccessToken(resellerId);
      const remove = await atomVamInstance.delete(formData, {
        "Content-Type": "application/json",
        "X-AccessToken": accessToken,
      });
      if (
        remove.body &&
        remove.body !== undefined &&
        remove.body !== null &&
        Object.keys(remove.body).length !== 0
      ) {
        return callback(
          remove.body,
          statusCode.success,
          "1",
          remove.header.message
        );
      } else {
        return callback(
          remove.body,
          statusCode.notFound,
          "0",
          remove.header.message
        );
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  renew: async (resellerId, formData, callback) => {
    try {
      const accessToken = await getAccessToken(resellerId);
      const renew = await atomVamInstance.renew(formData, {
        "Content-Type": "application/json",
        "X-AccessToken": accessToken,
      });
      if (
        renew.body &&
        renew.body !== undefined &&
        renew.body !== null &&
        Object.keys(renew.body).length !== 0
      ) {
        return callback(
          renew.body,
          statusCode.success,
          "1",
          renew.header.message
        );
      } else {
        return callback(
          renew.body,
          statusCode.notFound,
          "0",
          renew.header.message
        );
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  create: async (resellerId, body, callback) => {
    try {
      let concurrentUser, sessionLimit, countries, cities, protocols;
      const accessToken = await getAccessToken(resellerId);
      const serviceTypes = await atomInventoryInstance.getAllServiceTypes({
        "Content-Type": "application/json",
        "X-AccessToken": accessToken,
      });
      serviceTypes.body.map((service) => {
        if (service.serviceKey === "session_limit") {
          sessionLimit = service.serviceId;
        }
        if (service.serviceKey === "concurrent_users") {
          concurrentUser = service.serviceId;
        }
        if (service.serviceKey === "protocol") {
          protocols = service.serviceId;
        }
        if (service.serviceKey === "country") {
          countries = service.serviceId;
        }
        if (service.serviceKey === "city") {
          cities = service.serviceId;
        }
      });

      const preference = {
        [sessionLimit]: body.session_limit,
        [concurrentUser]: body.concurrent_user,
        [countries]: body.countries,
        [cities]: body.cities,
        [protocols]: body.protocols,
      };

      const formData = {
        vpnUsername: body.vpnUsername,
        vpnPassword: body.vpnPassword,
        packageType: body.packageType,
        period: body.period,
        uuid: body.uuid,
        preference,
      };

      const newUser = await atomVamInstance.create(formData, {
        "X-AccessToken": accessToken,
      });
      if (
        newUser.body &&
        newUser.body !== undefined &&
        newUser.body !== null &&
        Object.keys(newUser.body).length !== 0
      ) {
        return callback(
          newUser.body,
          statusCode.success,
          "1",
          newUser.header.message
        );
      } else {
        return callback(
          newUser.body,
          statusCode.notFound,
          "0",
          newUser.header.message
        );
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  extendExpiry: async (resellerId, formData, callback) => {
    try {
      const accessToken = await getAccessToken(resellerId);
      const extendExpiry = await atomVamInstance.extendExpiry(formData, {
        "Content-Type": "application/json",
        "X-AccessToken": accessToken,
      });
      console.log(extendExpiry);
      if (
        extendExpiry.body &&
        extendExpiry.body !== undefined &&
        extendExpiry.body !== null &&
        Object.keys(extendExpiry.body).length !== 0
      ) {
        return callback(
          extendExpiry.body,
          statusCode.success,
          "1",
          extendExpiry.header.message
        );
      } else {
        return callback(
          extendExpiry.body,
          statusCode.notFound,
          "0",
          extendExpiry.header.message
        );
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  changePassword: async (resellerId, formData, callback) => {
    try {
      const accessToken = await getAccessToken(resellerId);
      const changePassword = await atomVamInstance.changePassword(formData, {
        "Content-Type": "application/json",
        "X-AccessToken": accessToken,
      });
      if (
        changePassword.body &&
        changePassword.body !== undefined &&
        changePassword.body !== null &&
        Object.keys(changePassword.body).length !== 0
      ) {
        return callback(
          changePassword.body,
          statusCode.success,
          "1",
          changePassword.header.message
        );
      } else {
        return callback(
          changePassword.body,
          statusCode.notFound,
          "0",
          changePassword.header.message
        );
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  updatePreferences: async (resellerId, formData, callback) => {
    try {
      let concurrentUser, sessionLimit, countries, cities, protocols;
      const accessToken = await getAccessToken(resellerId);
      const serviceTypes = await atomInventoryInstance.getAllServiceTypes({
        "Content-Type": "application/json",
        "X-AccessToken": accessToken,
      });
      serviceTypes.body.map((service) => {
        if (service.serviceKey === "session_limit") {
          sessionLimit = service.serviceId;
        }
        if (service.serviceKey === "concurrent_users") {
          concurrentUser = service.serviceId;
        }
        if (service.serviceKey === "protocol") {
          protocols = service.serviceId;
        }
        if (service.serviceKey === "country") {
          countries = service.serviceId;
        }
        if (service.serviceKey === "city") {
          cities = service.serviceId;
        }
      });

      const preference = {
        [sessionLimit]: formData.session_limit,
        [concurrentUser]: formData.concurrent_user,
        [countries]: formData.countries,
        [cities]: formData.cities,
        [protocols]: formData.protocols,
      };

      const updatePreferences = await atomVamInstance.updatePreferences(
        { preference: preference },
        {
          "Content-Type": "application/json",
          "X-AccessToken": accessToken,
        }
      );
      if (
        updatePreferences.body &&
        updatePreferences.body !== undefined &&
        updatePreferences.body !== null &&
        Object.keys(updatePreferences.body).length !== 0
      ) {
        return callback(
          updatePreferences.body,
          statusCode.success,
          "1",
          updatePreferences.header.message
        );
      } else {
        return callback(
          updatePreferences.body,
          statusCode.notFound,
          "0",
          updatePreferences.header.message
        );
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  enableOrDisable: async (resellerId, formData, callback) => {
    try {
      if (formData.action === "enable") {
        const accessToken = await getAccessToken(resellerId);
        const enable = await atomVamInstance.enable(formData, {
          "Content-Type": "application/json",
          "X-AccessToken": accessToken,
        });
        if (
          enable.body &&
          enable.body !== null &&
          enable.body !== undefined &&
          Object.keys(enable.body).length !== 0
        ) {
          return callback(
            enable.body,
            statusCode.success,
            "1",
            "VPN Account Enabled Successfully"
          );
        } else {
          return callback(
            undefined,
            statusCode.notFound,
            "0",
            "VPN Account Not Enabled"
          );
        }
      } else {
        const accessToken = await getAccessToken(resellerId);
        const disable = await atomVamInstance.disable(formData, {
          "Content-Type": "application/json",
          "X-AccessToken": accessToken,
        });
        if (
          disable.body &&
          disable.body !== null &&
          disable.body !== undefined &&
          Object.keys(disable.body).length !== 0
        ) {
          return callback(
            disable.body,
            statusCode.success,
            "1",
            "VPN Account Disabled Successfully"
          );
        } else {
          return callback(
            undefined,
            statusCode.notFound,
            "0",
            "VPN Account Not Disabled"
          );
        }
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  getResellerInventory: async (resellerId, callback) => {
    try {
      const accessToken = await getAccessToken(resellerId);
      const getResellerInventory = await atomVamInstance.getResellerInventory(
        `?iId=${resellerId}`,
        {
          "Content-Type": "application/json",
          "X-AccessToken": accessToken,
        }
      );
      if (
        getResellerInventory.body &&
        getResellerInventory.body !== null &&
        getResellerInventory.body !== undefined &&
        Object.keys(getResellerInventory.body).length !== 0
      ) {
        return callback(
          getResellerInventory.body,
          statusCode.success,
          "1",
          "Reseller Inventory Found Successfully"
        );
      } else {
        return callback(
          undefined,
          statusCode.notFound,
          "0",
          "Reseller Inventory Not Found"
        );
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  listUsers: async (resellerId, callback) => {
    try {
      const accessToken = await getAccessToken(resellerId);
      const listUsers = await atomVamInstance.listUsers(
        `?iResellerId=${resellerId}&iPage=1`,
        {
          "Content-Type": "application/json",
          "X-AccessToken": accessToken,
        }
      );

      if (
        listUsers.body.data &&
        listUsers.body.data !== null &&
        listUsers.body.data !== undefined &&
        Object.keys(listUsers.body).length !== 0
      ) {
        return callback(
          listUsers.body.data,
          statusCode.success,
          "1",
          "VPN Users Found Successfully"
        );
      } else {
        return callback(
          undefined,
          statusCode.notFound,
          "0",
          "VPN Users Not Found"
        );
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  getAllServiceTypes: async (resellerId, callback) => {
    try {
      const accessToken = await getAccessToken(resellerId);
      const serviceTypes = await atomInventoryInstance.getAllServiceTypes({
        "Content-Type": "application/json",
        "X-AccessToken": accessToken,
      });
      if (
        serviceTypes.body &&
        serviceTypes.body !== null &&
        serviceTypes.body !== undefined &&
        Object.keys(serviceTypes.body).length !== 0
      ) {
        return callback(
          serviceTypes.body,
          statusCode.success,
          "1",
          "VPN Services Found Successfully"
        );
      } else {
        return callback(
          undefined,
          statusCode.notFound,
          "0",
          "VPN Services Not Found"
        );
      }
    } catch (error) {
      return {
        code: statusCode.someThingWentWrong,
        status: "0",
        message: headerMessage.someThingWentWrong,
      };
    }
  },
};
