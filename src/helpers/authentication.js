const bcrypt = require("bcrypt");
const { User } = require("../models/user");

const authenticationMiddleware = async (request, response, next) => {
  try {
    await User.findOne({ where: { email: request.body.email } }).then(
      (user) => {
        user !== null
          ? (async () => {
              const isMatched = await bcrypt.compare(
                request.body.password,
                user.password
              );
              !isMatched
                ? response.status(400).send({
                    status: "0",
                    message: "Invalid Credentials",
                  })
                : next();
            })()
          : (async () => {
              response.status(400).send({
                status: "0",
                message: "Invalid Credentials",
              });
            })();
      }
    );
  } catch (error) {
    return;
  }
};

module.exports = {
  authenticationMiddleware: authenticationMiddleware,
};
