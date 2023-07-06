// Require express
const router = require("express").Router();

// Requirements
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  removeFriend,
  deleteUser,
  removeThought,
  addFriend,
} = require("../../controllers/userController");
// /api/users
router.route("/").get(getUser).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

// /api/users/:userId/:thoughtId
router.route("/:userId/:thoughtId").delete(removeThought);

// Module export router
module.exports = router;
