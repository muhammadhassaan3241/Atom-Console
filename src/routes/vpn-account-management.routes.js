// packages
import { Router } from "express";
const router = Router();

// modules
import {
    changePasswordOfVpnUser,
    createVpnUser,
    deleteVpnUser,
    disableVpnUser,
    enableVpnUser,
    extendExpiryOfVpnUser,
    getVpnUserStatus,
    renewVpnUser,
    updatePreferencesofVpnUser,
} from "../controllers/vpn-account-management.controller.js";

// routes
router
    .post("/vpn-user/status", getVpnUserStatus)
    .post("/vpn-user/delete", deleteVpnUser)
    .post("/vpn-user/renew", renewVpnUser)
    .post("/vpn-user/extendExpiry", extendExpiryOfVpnUser)
    .post("/vpn-user/changePassword", changePasswordOfVpnUser)
    .post("/vpn-user/enable", enableVpnUser)
    .post("/vpn-user/disable", disableVpnUser)
    .post("/vpn-user/create", createVpnUser)
    .post("/vpn-user/updatePreferences", updatePreferencesofVpnUser)

export default router;