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
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    retweetUsers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    retweetedPost: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
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

postSchema.post("save", function (doc, next) {
  doc
    .populate({ path: "retweetedPost" })
    .then(() => next())
    .catch(next);
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "retweetedPost",
  });
  next();
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
