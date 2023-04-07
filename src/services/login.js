const CrudRepository = require("../repositories/crud");
const { User } = require("../models/user");
const crudInstance = new CrudRepository();
const jwt = require("jsonwebtoken");
const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");

module.exports = {
  loginAdmin: async (body, callback) => {
    try {
      const filteredQuery = {
        where: { email: body.email },
        attributes: { exclude: ["password"] },
      };
      const user = await crudInstance.findOne(User, filteredQuery);
      if ((user !== null) & (user !== undefined)) {
        const options = { expiresIn: "1h" };
        const token = jwt.sign(body, process.env.JWT_SECRET_KEY, options);
        user.token = token;
        await user.save();
        return callback(
          user,
          statusCode.success,
          "1",
          "User Successfully Logged In"
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
