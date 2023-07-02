// Set requirements
const router = require("express").Router();

// Set routes
const usersRoutes = require("./user-routes");
const thoughtsRoutes = require("./thought-routes");

// Add users routes
router.use("/users", usersRoutes);

// Add thoughts routes
router.use("/thoughts", thoughtsRoutes);

// Export Module Router
module.exports = router;
