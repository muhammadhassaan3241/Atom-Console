const { adminURL } = require("../constants/constant");
const { loginAdmin } = require("../controllers/admin");
const {
  loginValidationMiddleware,
  loginValidationErroreHandler,
} = require("../helpers/validator");
const { authenticationMiddleware } = require("../helpers/authentication");
const { getUserSubscriptionType } = require("../helpers/subscriptionType");
const router = require("express").Router();

router.post(
  adminURL.adminLogin,
  loginValidationMiddleware,
  loginValidationErroreHandler,
  authenticationMiddleware,
  getUserSubscriptionType,
  loginAdmin
);

module.exports = router;
