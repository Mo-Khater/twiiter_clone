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

exports.updatePost = catchAsync(async (req, res, next) => {
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
