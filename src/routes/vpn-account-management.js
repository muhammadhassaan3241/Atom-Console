const { vpnAccountManagementURL } = require("../constants/constant");
const {
  status,
  create,
  renew,
  remove,
  extendExpiry,
  updatePreferences,
  getResellerInventory,
  enableOrDisable,
  listUsers,
  getAllServiceTypes,
} = require("../services/vpn-account-management");

const router = require("express").Router();

router
  .post(vpnAccountManagementURL.getVpnAccountStatus, status)
  .post(vpnAccountManagementURL.createVpnAccount, create)
  .post(vpnAccountManagementURL.renewVpnAccount, renew)
  .post(vpnAccountManagementURL.deleteVpnAccount, remove)
  .post(vpnAccountManagementURL.extendExpiryOfVpnAccount, extendExpiry)
  .post(vpnAccountManagementURL.updatePreferenceOfVpnAccount, updatePreferences)
  .post(vpnAccountManagementURL.getUserInventory, getResellerInventory)
  .get(vpnAccountManagementURL.enable_disableVpnAccount, enableOrDisable)
  .get(vpnAccountManagementURL.getUsers, listUsers)
  .get(vpnAccountManagementURL.getServiceTypes, getAllServiceTypes);

module.exports = router;
