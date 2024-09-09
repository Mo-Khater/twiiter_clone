const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.updateUser = catchAsync(async (req, res, next) => {
  const postId = req.body.id;
  const action = req.body.action; // Determine if the action is a like or a retweet
  let option, field;
  if (action === "like") {
    const isLiked = req.session.user.likes && req.session.user.likes.includes(postId);
    option = isLiked ? "$pull" : "$addToSet";
    field = "likes";
  } else if (action === "retweet") {
    const isRetweeted = req.session.user.retweets && req.session.user.retweets.includes(postId);
    option = isRetweeted ? "$pull" : "$addToSet";
    field = "retweets";
  }

  req.session.user = await User.findByIdAndUpdate(
    req.session.user._id,
    {
      [option]: { [field]: postId },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
  });
});

