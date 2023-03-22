// packages
import { Router } from "express";
const router = Router();

// modules
// import {
//     getGraphData
// } from "../controllers/partner_bill.controller.js";
import {
    getInvoices,
    getVpnActiveUsers,
    getVpnConnectedUsers
} from "../controllers/billing.controller.js";

// routes
router
    .get("/invoices/read", getInvoices)
    // .get("/bills/read", getGraphData)
    .get("/active-users/read", getVpnActiveUsers)
    .get("/connected-users/read", getVpnConnectedUsers)

export default router;