const { userURL } = require("../constants/constant");
const { getUsers, getUserByResellerId, createUser, updateUser, deleteUser } = require("../controllers/user");

const router = require("express").Router();

router
    .get(userURL.getUsers, getUsers)
    .get(userURL.getUserByResellerId, getUserByResellerId)
    .post(userURL.createUser, createUser)
    .get(userURL.updateUser, updateUser)
    .get(userURL.deleteUser, deleteUser);

module.exports = router;
