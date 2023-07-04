// Require Mongoos and Moment
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require("./Reactions");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Total count of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create Thoughts model
const Thoughts = model("Thoughts", thoughtSchema);

// Export Thoughts Module
module.exports = Thoughts;
