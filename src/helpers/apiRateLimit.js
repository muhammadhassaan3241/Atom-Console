const rateLimit = require("express-rate-limit");
const { restResponse } = require("../controllers/base");
const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");

const apiRequestLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 200,
  handler: (request, response, next) => {
    return restResponse(
      response,
      statusCode.someThingWentWrong,
      headerMessage.someThingWentWrong
    );
  },
});

module.exports = {
  apiRequestLimiter: apiRequestLimiter,
};
