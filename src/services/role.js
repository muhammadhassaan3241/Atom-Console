const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const { User, Role } = require("../models/user");
const RoleRepository = require("../repositories/crud");

const roleInstance = new RoleRepository();

module.exports = {
  getRoles: async (resellerId, callback) => {
    try {
      const filteredQuery = {};
      const roles = await roleInstance.findAll(Role, filteredQuery);
      return callback(roles);
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  getRoleByRoleId: async (resellerId, roleId, callback) => {
    try {
      const filteredQuery = { where: { id: roleId } };
      const role = await roleInstance.findOne(Role, filteredQuery);
      return callback(role);
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  createNewRole: async (resellerId, formData, callback) => {
    try {
      const roleName = { name: formData.name };
      const roleFilteredQuery = { where: roleName };
      const permissionFilteredQuery = {
        where: { name: { [Sequelize.Op.in]: formData.permissions } },
      };

      const role = await roleInstance.findOne(Role, roleFilteredQuery);
      if (role !== undefined && role !== null) {
        const newRole = await roleInstance.create(User, formData);
        const permissions = await roleInstance.findAll(
          Permissions,
          permissionFilteredQuery
        );
        await roleInstance.setPermissions(newRole, permissions);
        return callback(newRole);
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  updateRole: async (resellerId, formData, roleId, callback) => {
    try {
      const roleFilteredQuery = { where: { id: roleId } };

      const role = await roleInstance.findOne(Role, roleFilteredQuery);
      if (role !== null && role !== undefined) {
        await roleInstance.update(role, formData);
        return callback(role);
      } else {
        return callback();
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  deleteRole: async (resellerId, roleId, callback) => {
    try {
      const filteredQuery = { where: { id: roleId } };
      const role = await roleInstance.destroy(Role, filteredQuery);
      return callback(role);
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },
};
