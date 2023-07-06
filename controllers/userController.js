const { ObjectId } = require("mongoose").Types;
const { Users, Thoughts } = require("../models");

const headCount = async () => {
  const numberOfUser = await Users.aggregate().count("userCount");
  return numberOfUser;
};

module.exports = {
  // GET USER
  async getUser(req, res) {
    try {
      const users = await Users.find()
        .select("-__v")
        //GET  user by its _id and populated thought and friend data
        .populate("thoughts")
        .populate("friends")
        .exec();

      const userObj = {
        users,
        headCount: await headCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Single user
  async getSingleUser(req, res) {
    try {
      const user = await Users.findById(req.params.userId)
        .select("-__v")
        //GET a user by _id, populated thoughts and friends data
        .populate("thoughts")
        .populate("friends")
        .exec();

      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // POST new user
  async createUser(req, res) {
    try {
      const { username, email } = req.body;
      const newUser = new Users({
        username,
        email,
      });
      const createdUser = await newUser.save();
      res.json(createdUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  /// Update by id
  async updateUser(req, res) {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
      }

      res.json(user);
      console.log(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete one user
  async deleteUser(req, res) {
    try {
      const user = await Users.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user exists with this id" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Remove a thought from one user
  async removeThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      const user = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thoughts: { _id: req.params.thoughtId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No user found with this ID :(" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend to a user
  async addFriend(req, res) {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with this ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE to remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const user = await Users.findByIdAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No friend found with this ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
