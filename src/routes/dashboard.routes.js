// packages
import { Router } from "express";
const router = Router();

// modules
import { getMonthlyConnectedUsers, getProtocolList, getUserSourceCountry, getUserDestinationCountry } from "../controllers/dashboard.controller.js";

// routes
router
    .get("/monthly-users/read", getMonthlyConnectedUsers)
    .get("/protocol-list/read", getProtocolList)
    .get("/user-source-country/read", getUserSourceCountry)
    .get("/user-destination-country/read", getUserDestinationCountry)

export default router;