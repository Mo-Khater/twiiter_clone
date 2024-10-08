const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const router = express.Router();
// Router.get('/',)

router.get("/", authController.protect, viewController.homePage);
router.get("/login", viewController.login);
router.get("/register", viewController.register);

module.exports = router;
