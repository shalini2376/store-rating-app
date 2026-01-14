const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

const { signupValidation, loginValidation} = require("../utils/validators");

router.post("/signup", signupValidation, authController.signup);
router.post("/login", loginValidation, authController.login);

module.exports = router;