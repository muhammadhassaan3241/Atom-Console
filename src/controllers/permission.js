const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const permissionServices = require("../services/permission");
const { restResponse } = require("./base");

module.exports = {
  getPermissions: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      await permissionServices.getPermissions(resellerId, (data) => {
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

  getPermissionByPermissionId: async (request, response) => {
    try {
      const resellerId = request.reseller_id || request.params.reseller;
      const permissionId = request.params.id;
      await permissionServices.getPermissionByPermissionId(
        resellerId,
        permissionId,
        (data) => {
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
        }
      );
    } catch (error) {
      return restResponse(
        response,
        statusCode.someThingWentWrong,
        headerMessage.someThingWentWrong,
        null
      );
    }
  },

  createPermission: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      const formData = request.body;

      permissionServices.createNewPermission(resellerId, formData, (data) => {
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

  updatePermission: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      const formData = request.body;
      const permissionId = request.params.id;
      permissionServices.updatePermission(
        resellerId,
        formData,
        permissionId,
        (data) => {
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
              { data }
            );
          }
        }
      );
    } catch (error) {
      return restResponse(
        response,
        statusCode.someThingWentWrong,
        headerMessage.someThingWentWrong,
        null
      );
    }
  },

  deletePermission: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      const permissionId = request.params.id;
      permissionServices.deletePermission(resellerId, permissionId, (data) => {
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
