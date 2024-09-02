const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new appError("please enter email and password", 400));
  const user = await User.findOne({ email }).select("+password");
  if (!user || !user.checkCorrectPassword(password, user.password))
    return next(new appError("invalid email or password", 400));

  req.session.user = user;
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.logout = (req, res, next) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  }
};

exports.register = catchAsync(async (req, res, next) => {
  const newuser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmpassword,
  });
  req.session.user = newuser;
  res.status(200).json({
    status: "success",
    data: {
      newuser,
    },
  });
});

exports.protect = (req, res, next) => {
  if (req.session && req.session.user) return next();

  res.redirect("/login");
};
