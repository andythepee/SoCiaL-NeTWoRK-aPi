// Require express and route
const router = require("express").Router();

// Requirements
const {
  getThought,
  createNewThought,
  getSingleThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThought).post(createNewThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reaction
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtId/:reactionId
router.route("/:thoughtId/:reactionId").delete(removeReaction);

// Export module router
module.exports = router;
