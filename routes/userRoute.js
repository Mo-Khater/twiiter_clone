const express = require("express");
const authController = require("../controllers/authController");
const userController=require("../controllers/userController")
const router = express.Router();

router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/register", authController.register);

router.use(authController.protect);

router.put("/me", userController.updateUser);


module.exports = router;
