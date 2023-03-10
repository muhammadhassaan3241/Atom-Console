// packages
import { Router } from "express";
const router = Router();

// modules
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { getRoles, getRoleById, createRole, updateRole, deleteRole } from "../controllers/role.controller.js";
import { getPermissions, getPermissionById, createPermission, updatePermission, deletePermission } from "../controllers/permission.controller.js";

// routes
router
    .get("/users/get", getUsers)
    .post("/users/create", createUser)
    .get("/users/get/:id", getUserById)
    .get("/users/update/:id", updateUser)
    .get("/users/delete/:id", deleteUser)

    .get("/roles/get", getRoles)
    .post("/roles/create", createRole)
    .get("/roles/get/:id", getRoleById)
    .get("/roles/update/:id", updateRole)
    .get("/roles/delete/:id", deleteRole)

    .get("/permissions/get", getPermissions)
    .post("/permissions/create", createPermission)
    .get("/permissions/get/:id", getPermissionById)
    .get("/permissions/update/:id", updatePermission)
    .get("/permissions/delete/:id", deletePermission)

export default router;