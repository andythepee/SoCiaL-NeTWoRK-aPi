const express = require("express");
const mongoose = require("mongoose");
const thoughtController = require("./controllers/thoughtController");
const userController = require("./controllers/userController");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/api/users", userController.getUser);
app.get("/api/users/:userId", userController.getSingleUser);
app.post("/api/users", userController.createUser);
app.put("/api/users/:userId", userController.updateUser);
app.delete("/api/users/:userId", userController.deleteUser);
app.post("/api/users/:userId/friends/:friendId", userController.addFriend);
app.delete("/api/users/:userId/friends/:friendId", userController.removeFriend);

app.get("/api/thoughts", thoughtController.getThoughts);
app.get("/api/thoughts/:thoughtId", thoughtController.getSingleThought);
app.post("/api/thoughts", thoughtController.createThought);
app.put("/api/thoughts/:thoughtId", thoughtController.updateThought);
app.delete("/api/thoughts/:thoughtId", thoughtController.removeThought);
app.post(
  "/api/thoughts/:thoughtId/reactions",
  thoughtController.createReaction
);
app.delete(
  "/api/thoughts/:thoughtId/reactions/:reactionId",
  thoughtController.removeReaction
);

// Start the server and sync models to the database
async function startServer() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/socialMediaDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
