const { body, validationResult } = require("express-validator");

const loginValidationMiddleware = [
  body("email").notEmpty().withMessage("email is required"),
  body("email").isEmail().withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
];

const loginValidationErroreHandler = async (request, response, next) => {
  const errors = validationResult(request);
  !errors.isEmpty()
    ? response.status(400).send({
        message: "Invalid Parameters",
        data: errors.array(),
      })
    : next();
};

module.exports = {
  loginValidationMiddleware: loginValidationMiddleware,
  loginValidationErroreHandler: loginValidationErroreHandler,
};
