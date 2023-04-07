const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const userServices = require("../services/user");
const { restResponse } = require("./base");

module.exports = {
  getUsers: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      await userServices.getUsers(resellerId, (data) => {
        if (data !== undefined && data !== null) {
          return restResponse(
            response,
            statusCode.success,
            headerMessage.success,
            data
          );
        } else {
          restResponse(
            response,
            statusCode.notFound,
            headerMessage.notFound,
            data
          );
        }
      });
    } catch (error) {
      return restResponse(
        response,
        statusCode.someThingWentWrong,
        headerMessage.someThingWentWrong,
        null
      );
    }
  },

  getUserByParentId: async (request, response) => {
    try {
      const parentId = request.params.parentId;
      await userServices.getUserByParentId(parentId, (data) => {
        if (data !== undefined && data !== null) {
          return restResponse(
            response,
            statusCode.success,
            headerMessage.success,
            data
          );
        } else {
          restResponse(
            response,
            statusCode.notFound,
            headerMessage.notFound,
            data
          );
        }
      });
    } catch (error) {
      return restResponse(
        response,
        statusCode.someThingWentWrong,
        headerMessage.someThingWentWrong,
        null
      );
    }
  },

  createUser: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const formData = request.body;
      userServices.createNewUser(resellerId, formData, (data) => {
        if (data !== undefined && data !== null) {
          return restResponse(
            response,
            statusCode.success,
            headerMessage.success,
            data
          );
        } else {
          restResponse(
            response,
            statusCode.notFound,
            headerMessage.notFound,
            data
          );
        }
      });
    } catch (error) {
      return restResponse(
        response,
        statusCode.someThingWentWrong,
        headerMessage.someThingWentWrong,
        null
      );
    }
  },

  updateUser: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const formData = request.body;
      const userId = request.params.id;
      userServices.updateUser(resellerId, formData, userId, (data) => {
        if (data !== undefined && data !== null) {
          return restResponse(
            response,
            statusCode.success,
            headerMessage.success,
            { data }
          );
        } else {
          restResponse(response, statusCode.notFound, headerMessage.notFound, {
            data,
          });
        }
      });
    } catch (error) {
      return restResponse(
        response,
        statusCode.someThingWentWrong,
        headerMessage.someThingWentWrong,
        null
      );
    }
  },

  deleteUser: async (request, response) => {
    try {
      const resellerId = request.user.reseller_id;
      const userId = request.params.id;
      userServices.deleteUser(resellerId, userId, (data) => {
        if (data !== undefined && data !== null) {
          return restResponse(
            response,
            statusCode.success,
            headerMessage.success,
            { data }
          );
        } else {
          restResponse(response, statusCode.notFound, headerMessage.notFound, {
            data,
          });
        }
      });
    } catch (error) {
      return restResponse(
        response,
        statusCode.someThingWentWrong,
        headerMessage.someThingWentWrong,
        null
      );
    }
  },
};
