const { body } = require("express-validator");

const userRegistrationSchema = [
    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isString()
        .withMessage("Username must be a string")
        .isLength({ min: 3, max: 50 })
        .withMessage("Username must be between 3 and 50 characters"),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .isLength({ max: 100 })
        .withMessage("Email must not exceed 100 characters"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 6, max: 100 })
        .withMessage("Password must be between 6 and 100 characters"),
    body("role")
        .optional()
        .isIn(["USER", "ADMIN"])
        .withMessage("Role must be either USER or ADMIN"),
];

const userLoginSchema = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
        .isString()
        .withMessage("Password must be a string")
        .notEmpty()
        .withMessage("Password is required"),
];

const userUpdateSchema = [
    body("username")
        .optional()
        .isString()
        .withMessage("Username must be a string")
        .isLength({ min: 3, max: 50 })
        .withMessage("Username must be between 3 and 50 characters"),
    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email format")
        .isLength({ max: 100 })
        .withMessage("Email must not exceed 100 characters"),
    body("password")
        .optional()
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 6, max: 100 })
        .withMessage("Password must be between 6 and 100 characters"),
    body("role")
        .optional()
        .isIn(["USER", "ADMIN"])
        .withMessage("Role must be either USER or ADMIN"),
];

module.exports = {
    userRegistrationSchema,
    userLoginSchema,
    userUpdateSchema,
};
