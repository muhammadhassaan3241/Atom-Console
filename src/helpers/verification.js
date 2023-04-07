const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const { restResponse } = require("../controllers/base");
const jwt = require("jsonwebtoken");
const { Permission, Role, User } = require("../models/user");

const jwtVerification = async (request, response, next) => {
  try {
    const authToken = request.headers["authorization"]?.split(" ")[1];
    if (authToken !== null) {
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
      const user = await User.findOne({
        where: { email: decodedToken?.email },
        attributes: { exclude: ["password", "parentkey"] },
        include: [
          {
            model: Role,
            attributes: ["name"],
            include: [
              {
                model: Permission,
                attributes: ["name"],
              },
            ],
          },
        ],
      });
      request.user = user;
      next();
    } else {
      return restResponse(
        response,
        statusCode.forbidden,
        headerMessage.forbidden,
        null
      );
    }
  } catch (error) {
    return restResponse(
      response,
      statusCode.forbidden,
      headerMessage.forbidden,
      null
    );
  }
};

module.exports = {
  jwtVerification: jwtVerification,
};
