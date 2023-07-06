// Require express router
const router = require("express").Router();

// Import API routes
const apiRoutes = require("./api");

// tells router to use the apiRoutes
router.use("/api", apiRoutes);

// Error
router.use((req, res) => res.send("Incorrect Route!"));

// Module exports router
module.exports = router;
