const { User } = require("../models/user");
const UserRepository = require("../repositories/crud");
const partnerBillingInstance = require("../repositories/partner-billing");
const userInstance = new UserRepository();

const getUserSubscriptionType = async (request, response, next) => {
  const filteredQuery = { where: { email: request.body.email } };
  const getUser = await userInstance.findOne(User, filteredQuery);
  const subscriptionType = await partnerBillingInstance.resellerBilling({
    "Content-Type": "application/json",
  });
  subscriptionType.body.forEach(async (user) => {
    if (getUser.reseller_id === user.reseller_id) {
      const subscription = { subscription: user.subscription_slug };
      await userInstance.update(getUser, subscription);
    }
  });
  return next();
};

module.exports = {
  getUserSubscriptionType: getUserSubscriptionType,
};
