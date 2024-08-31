const express = require("express");
const viewController = require("../controllers/viewController");
const router = express.Router();
// Router.get('/',)

router.get("/", viewController.homePage);
router.get("/login", viewController.login);
router.get("/register", viewController.register);

module.exports = router;
