const {body} = require("express-validator");

exports.signupValidation = [
    body("name")
        .isLength({min: 10, max: 40})
        .withMessage("Name must be 10-40 characters"),
    body("email").isEmail().withMessage("invalid email"),
    body("password")
        .isLength({min: 8, max: 16})
        .withMessage("Password must be 8–16 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter") 
        .matches(/[!@#$%^&*]/)
        .withMessage("Password must contain at least one special character"),
    body("address")
        .isLength({max: 400})
        .withMessage("Address max 400 characters"),
];

exports.loginValidation = [
    body("email").isEmail(),
    body("password").notEmpty(),
];

exports.updatePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters"),

  body("confirmPassword")
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage("Passwords do not match")
];

