const loginService = require("../services/login");
const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const { restResponse } = require("./base");
const { apiResponse } = require("./base");

module.exports = {
  loginAdmin: async (request, response) => {
    try {
      const formData = request.body;
      await loginService.loginAdmin(formData, (data, code, status, message) => {
        if (data !== undefined && data !== null) {
          return apiResponse(response, code, status, message, data);
        } else {
          return apiResponse(response, code, status, message, data);
        }
      });
    } catch (error) {
      return apiResponse(response, 500, "0", "Internal Server Error");
    }
  },
};
