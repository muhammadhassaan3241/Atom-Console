const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const userServices = require("../services/user");
const { restResponse, apiResponse } = require("./base");

module.exports = {
  getUsers: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      await userServices.getUsers(resellerId, (data, code, status, message) => {
        return apiResponse(response, code, status, message, data);
      });
    } catch (error) {
      return apiResponse(
        response,
        statusCode.someThingWentWrong,
        "0",
        headerMessage.someThingWentWrong
      );
    }
  },

  getUserByParentId: async (request, response) => {
    try {
      const parentId = request.params.parentId;
      await userServices.getUserByParentId(
        parentId,
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

  createUser: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const formData = request.body;
      userServices.createNewUser(
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
        headerMessage.someThingWentWrong
      );
    }
  },

  updateUser: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const formData = request.body;
      const userId = request.params.id;
      userServices.updateUser(
        resellerId,
        formData,
        userId,
        (data, code, status, message) => {
          if (data !== undefined && data !== null) {
            return restResponse(
              response,
              statusCode.success,
              headerMessage.success,
              { data }
            );
          } else {
            restResponse(
              response,
              statusCode.notFound,
              headerMessage.notFound,
              {
                data,
              }
            );
          }
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

  deleteUser: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const userId = request.params.id;
      userServices.deleteUser(
        resellerId,
        userId,
        (data, code, status, message) => {
          if (data !== undefined && data !== null) {
            return restResponse(
              response,
              statusCode.success,
              headerMessage.success,
              { data }
            );
          } else {
            restResponse(
              response,
              statusCode.notFound,
              headerMessage.notFound,
              {
                data,
              }
            );
          }
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
