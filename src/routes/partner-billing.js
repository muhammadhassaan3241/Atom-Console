const { billingURL } = require("../constants/constant");
const {
  getBillingInvoices,
  getActiveVpnUsers,
  getConnectedVpnUsers,
  getVpnBillingEstimation,
} = require("../controllers/partner-billing");

const router = require("express").Router();

router
  .get(billingURL.getVpnInvoicesUrl, getBillingInvoices)
  .get(billingURL.getVpnActiveUsers, getActiveVpnUsers)
  .get(billingURL.getConnectedUsers, getConnectedVpnUsers)
  .get(billingURL.getVpnBillingEstimation, getVpnBillingEstimation);

module.exports = router;
