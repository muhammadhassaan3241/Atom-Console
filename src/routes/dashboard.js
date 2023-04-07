const { dashboardURL } = require("../constants/constant");
const {
  getMonthlyVpnConnectedUsers,
  getProtocolList,
  getSourceCountry,
  getDestinationCountry,
} = require("../controllers/dashboard");

const router = require("express").Router();

router
  .get(dashboardURL.getVpnMonthlyUsers, getMonthlyVpnConnectedUsers)
  .get(dashboardURL.getVpnProtocolList, getProtocolList)
  .get(dashboardURL.getVpnUserSourceCountry, getSourceCountry)
  .get(dashboardURL.getVpnUsersDestinationCountry, getDestinationCountry);

module.exports = router;
