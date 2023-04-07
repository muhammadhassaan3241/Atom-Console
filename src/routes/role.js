const { roleURL } = require("../constants/constant");
const {
  getRoles,
  getRoleByRoleId,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/role");

const router = require("express").Router();

router
  .get(roleURL.getRoles, getRoles)
  .get(roleURL.getRoleByRoleId, getRoleByRoleId)
  .post(roleURL.createRole, createRole)
  .post(roleURL.updateRole, updateRole)
  .get(roleURL.deleteRole, deleteRole);

module.exports = router;
