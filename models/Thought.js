// Require Mongoos and Moment
const { Schema, Types, model } = require("mongoose");

const reactionSchema = require("./Reaction");

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
    },
    id: false,
  }
);

// Total count of reactions
// thoughtSchema.virtual("reactionCount").get(function () {
//   return this.reactions.length;
// });

// Create Thoughts model
const Thought = model("Thought", thoughtSchema);

// Export Thoughts Module
module.exports = Thought;
