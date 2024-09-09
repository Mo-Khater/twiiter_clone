const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");

router.use(authController.protect);

router.route("/").post(postController.createPost).get(postController.getPosts);
router.route("/:id/like").put(postController.updatePostafterLiked);
router.route("/:id/retweet").post(postController.updatePostafterretweet);

module.exports = router;
