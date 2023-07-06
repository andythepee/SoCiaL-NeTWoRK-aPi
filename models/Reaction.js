const { Schema, Types, model } = require("mongoose");
// reaction schema tied to thought

const reactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

reactionSchema.virtual("formatTime").get(function () {
  return this.createdAt.toLocaleDateString();
});
const Reaction = model("Reaction", reactionSchema);
// Exports the Schema
module.exports = reactionSchema;
