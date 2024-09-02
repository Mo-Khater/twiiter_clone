exports.login = (req, res, next) => {
  res.status(200).render("login", {
    title: "login",
  });
};
exports.register = (req, res, next) => {
  res.status(200).render("register", {
    title: "register",
  });
};

exports.homePage = (req, res, next) => {
  res.status(200).render("home", {
    pageTitle: "Home",
    user: req.session.user,
  });
};
