// packages
import { Router } from "express";
const router = Router();

// modules
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js";
import {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
} from "../controllers/role.controller.js";
import {
    getPermissions,
    getPermissionById,
    createPermission,
    updatePermission,
    deletePermission
} from "../controllers/permission.controller.js";
import {
    getInvoices
} from "../controllers/invoice.controller.js";
import {
    getGraphData
} from "../controllers/partner_bill.controller.js";

// routes
router
    .get("/users/read", getUsers)
    .post("/users/create", createUser)
    .get("/users/read/:id", getUserById)
    .get("/users/update/:id", updateUser)
    .get("/users/delete/:id", deleteUser)

    .get("/roles/read", getRoles)
    .post("/roles/create", createRole)
    .get("/roles/read/:id", getRoleById)
    .get("/roles/update/:id", updateRole)
    .get("/roles/delete/:id", deleteRole)

    .get("/permissions/read", getPermissions)
    .post("/permissions/create", createPermission)
    .get("/permissions/read/:id", getPermissionById)
    .get("/permissions/update/:id", updatePermission)
    .get("/permissions/delete/:id", deletePermission)

    .get("/invoices/read", getInvoices)
    .get("/bills/read", getGraphData)

export default router;