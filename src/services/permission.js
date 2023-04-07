const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const { User, Role: Permissions } = require("../models/user");
const RoleRepository = require("../repositories/crud");

const permissionInstance = new RoleRepository();

module.exports = {
  getPermissions: async (resellerId, callback) => {
    try {
      const filteredQuery = {};
      const permissions = await permissionInstance.findAll(
        Permissions,
        filteredQuery
      );
      return callback(permissions);
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  getPermissionByPermissionId: async (resellerId, permissionId, callback) => {
    try {
      const filteredQuery = { where: { id: permissionId } };
      const permission = await permissionInstance.findOne(
        Permissions,
        filteredQuery
      );
      return callback(permission);
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  createNewPermission: async (resellerId, formData, callback) => {
    try {
      const permissionName = { name: formData.name };
      const roleFilteredQuery = { where: permissionName };
      const permissionFilteredQuery = {
        where: { name: { [Sequelize.Op.in]: permissions } },
      };

      const role = await permissionInstance.findOne(
        Permissions,
        roleFilteredQuery
      );
      if (role !== undefined && role !== null) {
        const newRole = await permissionInstance.create(User, formData);
        const permissions = await permissionInstance.findAll(
          Permissions,
          permissionFilteredQuery
        );
        await permissionInstance.setPermissions(newRole, permissions);
        return callback(newRole);
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  updatePermission: async (resellerId, formData, permissionId, callback) => {
    try {
      const roleFilteredQuery = { where: { id: permissionId } };

      const permission = await permissionInstance.findOne(
        Permissions,
        roleFilteredQuery
      );
      if (permission !== null && permission !== undefined) {
        await permissionInstance.update(permission, formData);
        return callback(permission);
      } else {
        return callback();
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  deletePermission: async (resellerId, permissionId, callback) => {
    try {
      const filteredQuery = { where: { id: permissionId } };
      const permission = await permissionInstance.destroy(
        Permissions,
        filteredQuery
      );
      return callback(permission);
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },
};
