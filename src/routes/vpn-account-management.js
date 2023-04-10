const { vpnAccountManagementURL } = require("../constants/constant");
const {
  getVpnAccountStatus,
  createVpnAccount,
  renewVpnAccount,
  deleteVpnAccount,
  updatePreferenceOfVpnAccount,
  changePasswordOfVpnAccount,
  extendExpiryOfVpnAccount,
  getVpnUserInventory,
  getVpnUsers,
  enableOrDisableVpnAccount,
  getServices,
} = require("../controllers/vpn-account-management");

const router = require("express").Router();

router
  .post(vpnAccountManagementURL.getVpnAccountStatus, getVpnAccountStatus)
  .post(vpnAccountManagementURL.createVpnAccount, createVpnAccount)
  .post(vpnAccountManagementURL.renewVpnAccount, renewVpnAccount)
  .post(vpnAccountManagementURL.deleteVpnAccount, deleteVpnAccount)
  .post(
    vpnAccountManagementURL.extendExpiryOfVpnAccount,
    extendExpiryOfVpnAccount
  )
  .post(
    vpnAccountManagementURL.changePasswordOfVpnAccount,
    changePasswordOfVpnAccount
  )
  .post(
    vpnAccountManagementURL.updatePreferenceOfVpnAccount,
    updatePreferenceOfVpnAccount
  )
  .post(
    vpnAccountManagementURL.enable_disableVpnAccount,
    enableOrDisableVpnAccount
  )
  .get(vpnAccountManagementURL.getUserInventory, getVpnUserInventory)
  .get(vpnAccountManagementURL.getUsers, getVpnUsers)
  .get(vpnAccountManagementURL.getServiceTypes, getServices);

module.exports = router;
