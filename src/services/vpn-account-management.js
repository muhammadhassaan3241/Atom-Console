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

      return callback(status);
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

      return callback(remove);
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

      return callback(renew);
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
      const headers = {
        headers: {
          "Content-Type": "application/json",
          "X-AccessToken": accessToken,
        },
      };
      await axios.get(
        `${process.env.ATOM_BASE_URL}/getAllServiceTypes`,
        headers
      );
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

      const renew = await atomVamInstance.create(formData, {
        "Content-Type": "application/json",
        "X-AccessToken": accessToken,
      });

      return callback(renew);
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

      return callback(extendExpiry);
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

      return callback(changePassword);
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  updatePreferences: async (resellerId, formData, callback) => {
    try {
      const accessToken = await getAccessToken(resellerId);
      const updatePreferences = await atomVamInstance.updatePreferences(
        formData,
        {
          "Content-Type": "application/json",
          "X-AccessToken": accessToken,
        }
      );

      return callback(updatePreferences);
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
        return callback(enable);
      } else if (formData.action === "disable") {
        const accessToken = await getAccessToken(resellerId);
        const disable = await atomVamInstance.disable(formData, {
          "Content-Type": "application/json",
          "X-AccessToken": accessToken,
        });
        return callback(disable);
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
      const getResellerInventory = await atomVamInstance.getResellerInventory({
        "Content-Type": "application/json",
        "X-AccessToken": accessToken,
      });

      return callback(getResellerInventory);
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  listUsers: async (resellerId, callback) => {
    try {
      const accessToken = await getAccessToken(resellerId);
      const listUsers = await atomVamInstance.listUsers({
        "Content-Type": "application/json",
        "X-AccessToken": accessToken,
      });

      return callback(listUsers);
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
      if (serviceTypes.body.length > 0) {
        return callback(serviceTypes.body);
      } else {
        return callback([]);
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
