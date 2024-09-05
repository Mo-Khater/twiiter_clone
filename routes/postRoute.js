const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");

router.use(authController.protect)

router.route("/").post(postController.createPost).get(postController.getPosts);

module.exports = router;
