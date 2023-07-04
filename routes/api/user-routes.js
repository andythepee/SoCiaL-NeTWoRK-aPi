// Require express
const router = require("express").Router();

// Requirements
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/users-controller");
router.route("/").get().post();
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);
router.route("/").get(getAllUsers).post(createUser);
// Module export router
module.exports = router;
