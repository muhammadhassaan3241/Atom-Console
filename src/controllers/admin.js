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
};
