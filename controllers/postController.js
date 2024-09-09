const Post = require("../models/postModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createPost = catchAsync(async (req, res, next) => {
  const { postContent } = req.body;

  const newpost = await Post.create({
    content: postContent,
    user: req.session.user._id,
  });
  res.status(201).json({
    status: "success",
    newpost,
  });
});

exports.getPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({}).sort({ createdAt: 1 });

  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
});

exports.updatePostafterLiked = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const isLiked =
    req.session.user.likes && req.session.user.likes.includes(postId);

  const option = isLiked ? "$pull" : "$addToSet";

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      [option]: { likes: req.session.user._id },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: { post },
  });
});

exports.updatePostafterretweet = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  let retweetedPostId;

  const deletedPost = await Post.findOneAndDelete({
    user: req.session.user._id,
    retweetedPost: postId,
  });

  const option = deletedPost != null ? "$pull" : "$addToSet";

  let post = await Post.findByIdAndUpdate(
    postId,
    {
      [option]: { retweetUsers: req.session.user._id },
    },
    { new: true }
  );

  if (deletedPost == null) {
    const retweetedPost = await Post.create({
      user: req.session.user._id,
      retweetedPost: postId,
    });
    retweetedPostId = retweetedPost._id;
  } else {
    retweetedPostId = deletedPost._id;
  }

  // Convert the post to a plain object and add the retweetedPostId
  post = post.toObject();
  post.retweetedPostId = retweetedPostId;

  res.status(200).json({
    status: "success",
    data: { post },
  });
});
