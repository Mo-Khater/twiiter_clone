const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
exports.updateUser = catchAsync(async (req, res, next) => {
  const postId = req.body.id;
  const isLiked =
    req.session.user.likes && req.session.user.likes.includes(postId); // corrected to includes
  const option = isLiked ? "$pull" : "$addToSet";

  req.session.user = await User.findByIdAndUpdate(
    req.session.user._id,
    {
      [option]: { likes: postId },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
  });
});
