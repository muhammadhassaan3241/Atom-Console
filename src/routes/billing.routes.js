// packages
import { Router } from "express";
const router = Router();

// modules
import {
    getInvoices,
    getGraphData,
    getVpnActiveUsers,
    getVpnConnectedUsers
} from "../controllers/billing.controller.js";

// routes
router
    .get("/invoices/read", getInvoices)
    .get("/getBillingEstimations/read", getGraphData)
    .get("/active-users/read", getVpnActiveUsers)
    .get("/connected-users/read", getVpnConnectedUsers)

export default router;