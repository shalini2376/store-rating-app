const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

const { signupValidation, loginValidation, updatePasswordValidation} = require("../utils/validators");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/signup", signupValidation, authController.signup);
router.post("/login", loginValidation, authController.login);
router.post("/logout", authMiddleware, authController.logout);
router.post(
    "/update-password", 
    authMiddleware, 
    updatePasswordValidation, 
    authController.updatePassword
);

module.exports = router;