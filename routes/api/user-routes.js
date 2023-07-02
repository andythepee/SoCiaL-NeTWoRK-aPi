// Require express
const router = require("express").Router();

// Requirements
const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriend,
  deleteFriend,
} = require("../../controllers/users-controller");

router.route("/").get(getAllUsers).post(createUsers);

router.route("/:id").get(getUsersById).put(updateUsers).delete(deleteUsers);

router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

// Module export router
module.exports = router;
