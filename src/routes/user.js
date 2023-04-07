const { userURL } = require("../constants/constant");
const {
  getUsers,
  getUserByParentId,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const router = require("express").Router();

router
  .get(userURL.getUsers, getUsers)
  .get(userURL.getUserByResellerId, getUserByParentId)
  .post(userURL.createUser, createUser)
  .post(userURL.updateUser, updateUser)
  .get(userURL.deleteUser, deleteUser);

module.exports = router;
