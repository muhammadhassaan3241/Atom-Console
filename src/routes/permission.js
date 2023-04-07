const { permissionURL } = require("../constants/constant");
const {
  getPermissions,
  getPermissionByPermissionId,
  createPermission,
  updatePermission,
  deletePermission,
} = require("../controllers/permission");

const router = require("express").Router();

router
  .get(permissionURL.getPermissions, getPermissions)
  .get(permissionURL.getPermissionByPermissionId, getPermissionByPermissionId)
  .post(permissionURL.createPermission, createPermission)
  .post(permissionURL.updatePermission, updatePermission)
  .get(permissionURL.deletePermission, deletePermission);

module.exports = router;
