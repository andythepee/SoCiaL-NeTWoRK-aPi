// Require express and route
const router = require("express").Router();
const { route } = require("./user-routes");
// Requirements
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughts-controller");

router.route("/").get(getAllThoughts);

router.route("/:userId/:thoughtId").delete(removeThought);
router.route("/:thoughtId").get(getThoughtById).put(updateThought);
router.route("/:userId").post(addThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

// Export module router
module.exports = router;
