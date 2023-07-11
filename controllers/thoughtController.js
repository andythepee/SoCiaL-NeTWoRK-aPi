const { Users, Thoughts } = require("../models");

module.exports = {
  // gets all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thoughts.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // gets a single thought by ID
  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // creates a new thought
  async createThought(req, res) {
    try {
      const user = await Users.findOne({ username: req.body.username });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      const thought = await Thoughts.create(req.body);

      await Users.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // updates a single thought by ID
  async updateThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // removes a single thought by ID
  async removeThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({ message: "thought deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // adds a new reaction to a thought by ID
  async createReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // removes a reaction from a thought by ID
  async removeReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
