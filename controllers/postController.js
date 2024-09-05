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
