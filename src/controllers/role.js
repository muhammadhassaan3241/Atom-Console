const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const roleServices = require("../services/role");
const { restResponse } = require("./base");

module.exports = {
  getRoles: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      await roleServices.getRoles(resellerId, (data) => {
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

  getRoleByRoleId: async (request, response) => {
    try {
      const resellerId = request.reseller_id || request.params.reseller;
      const roleId = request.params.id;
      await roleServices.getRoleByRoleId(resellerId, roleId, (data) => {
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

  createRole: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      const formData = request.body;

      roleServices.createNewRole(resellerId, formData, (data) => {
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

  updateRole: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      const formData = request.body;
      const roleId = request.params.id;
      roleServices.updateRole(resellerId, formData, roleId, (data) => {
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

  deleteRole: async (request, response) => {
    try {
      const resellerId = request.reseller_id;
      const roleId = request.params.id;
      roleServices.deleteRole(resellerId, roleId, (data) => {
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
