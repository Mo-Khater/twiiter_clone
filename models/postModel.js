const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    binned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

postSchema.post("save", function (doc, next) {
  doc
    .populate({ path: "user" })
    .then(() => next())
    .catch(next);
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
  });
  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
