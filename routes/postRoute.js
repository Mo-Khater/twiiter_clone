const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");

router.route("/").post(authController.protect, postController.createPost);

module.exports = router;
