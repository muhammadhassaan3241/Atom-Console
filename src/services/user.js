const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const { User, Role } = require("../models/user");
const UserRepository = require("../repositories/crud");

const userInstance = new UserRepository();

module.exports = {
  getUsers: async (resellerId, callback) => {
    try {
      const filteredQuery = {};
      const users = await userInstance.findAll(User, filteredQuery);
      return callback(users);
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  getUserByParentId: async (parentkey, callback) => {
    try {
      const filteredQuery = { where: { parentkey: parentkey } };
      const user = await userInstance.findOne(User, filteredQuery);
      return callback(user);
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  createNewUser: async (resellerId, formData, callback) => {
    try {
      const roleName = { name: formData.role };
      const userEmail = { email: formData.email };
      const roleFilteredQuery = { where: roleName };
      const userFilteredQuery = { where: userEmail };
      const user = await userInstance.findOne(User, userFilteredQuery);
      if (user === null || user === undefined) {
        const newUser = await userInstance.create(User, formData);
        const role = await userInstance.findOne(Role, roleFilteredQuery);
        await userInstance.setRole(newUser, role);
        return callback(newUser);
      }
      return callback(user);
    } catch (error) {
      let code = statusCode.someThingWentWrong;
      let message = headerMessage.someThingWentWrong;
      return { code, message };
    }
  },

  updateUser: async (resellerId, formData, userId, callback) => {
    try {
      const userFilteredQuery = { where: { id: userId } };
      const roleFilteredQuery = { where: { name: formData.role } };

      if (formData.role !== null && formData.role !== undefined) {
        const user = await userInstance.findOne(User, userFilteredQuery);
        if ((user !== null) & (user !== undefined)) {
          const role = await userInstance.findOne(Role, roleFilteredQuery);
          await userInstance.setRole(user, role);
          await userInstance.update(user, formData);
          return callback(user);
        } else {
          return callback(user);
        }
      }

      const user = await userInstance.findOne(User, userFilteredQuery);
      if (user !== null && user !== undefined) {
        await userInstance.update(user, formData);
        return callback(user);
      } else {
        return callback(user);
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  deleteUser: async (resellerId, userId, callback) => {
    try {
      const filteredQuery = { where: { id: userId } };
      const user = await userInstance.destroy(User, filteredQuery);
      return callback(user);
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },
};
