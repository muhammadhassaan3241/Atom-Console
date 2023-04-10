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
      if (
        users &&
        users !== null &&
        users !== undefined &&
        Object.keys(users).length !== 0
      ) {
        return callback(
          users,
          statusCode.success,
          "1",
          "Users Found Successfully"
        );
      } else {
        return callback(users, statusCode.notFound, "0", "Users Not Found");
      }
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
      if (
        user &&
        user !== null &&
        user !== undefined &&
        Object.keys(user).length !== 0
      ) {
        return callback(
          user,
          statusCode.success,
          "1",
          "User Found Successfully"
        );
      } else {
        return callback(user, statusCode.notFound, "0", "User Not Found");
      }
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
      if (
        user &&
        user !== null &&
        user !== undefined &&
        Object.keys(user).length !== 0
      ) {
        const newUser = await userInstance.create(User, formData);
        const role = await userInstance.findOne(Role, roleFilteredQuery);
        await userInstance.setRole(newUser, role);
        return callback(
          newUser,
          statusCode.success,
          "1",
          "User Created Successfully"
        );
      } else {
        return callback(
          user,
          statusCode.badRequest,
          "0",
          "User Already Exists"
        );
      }
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

      if (
        formData.role &&
        formData.role !== null &&
        formData.role !== undefined
      ) {
        const user = await userInstance.findOne(User, userFilteredQuery);
        if ((user !== null) & (user !== undefined)) {
          const role = await userInstance.findOne(Role, roleFilteredQuery);
          await userInstance.setRole(user, role);
          await userInstance.update(user, formData);
          return callback(
            user,
            statusCode.success,
            "1",
            "User Updated Successfully"
          );
        } else {
          return callback(user, statusCode.notFound, "0", "Invalid User Id");
        }
      }

      const user = await userInstance.findOne(User, userFilteredQuery);
      if (
        user &&
        user !== null &&
        user !== undefined &&
        Object.keys(user).length !== 0
      ) {
        await userInstance.update(user, formData);
        return callback(
          user,
          statusCode.success,
          "1",
          "User Updated Successfully"
        );
      } else {
        return callback(user, statusCode.notFound, "0", "Invalid User Id");
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
      if (
        user &&
        user !== null &&
        user !== undefined &&
        Object.keys(user).length !== 0
      ) {
        await userInstance.update(user, formData);
        return callback(
          user,
          statusCode.success,
          "1",
          "User Deleted Successfully"
        );
      } else {
        return callback(user, statusCode.notFound, "0", "Invalid User Id");
      }
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },
};
