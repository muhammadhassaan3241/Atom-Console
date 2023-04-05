const { vpnAccountManagementURL } = require("../constants/constant");
const { getVpnAccountStatus, createVpnAccount, renewVpnAccount, deleteVpnAccount, extendExpiryOfVpnAccount, updatePreferenceOfVpnAccount, enableOrDisableVpnAccount, getVpnUserInventory, getVpnUsers } = require("../controllers/vpn-account-management");

const router = require("express").Router();

router
    .get(vpnAccountManagementURL.getVpnAccountStatus, getVpnAccountStatus)
    .get(vpnAccountManagementURL.createVpnAccount, createVpnAccount)
    .get(vpnAccountManagementURL.renewVpnAccount, renewVpnAccount)
    .get(vpnAccountManagementURL.deleteVpnAccount, deleteVpnAccount)
    .get(vpnAccountManagementURL.extendExpiryOfVpnAccount, extendExpiryOfVpnAccount)
    .get(vpnAccountManagementURL.updatePreferenceOfVpnAccount, updatePreferenceOfVpnAccount)
    .get(vpnAccountManagementURL.getUserInventory, getVpnUserInventory)
    .get(vpnAccountManagementURL.enable_disableVpnAccount, enableOrDisableVpnAccount)
    .get(vpnAccountManagementURL.getUsers, getVpnUsers);

module.exports = router;
