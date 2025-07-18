const { body } = require("express-validator");

const appointmentCreateSchema = [
    body("slot")
        .notEmpty()
        .withMessage("Slot ID is required")
        .isString()
        .withMessage("Slot ID must be a string")
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage("Invalid slot ID format"),
    body("user")
        .notEmpty()
        .withMessage("User ID is required")
        .isString()
        .withMessage("User ID must be a string")
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage("Invalid user ID format"),
    body("service")
        .notEmpty()
        .withMessage("Service ID is required")
        .isString()
        .withMessage("Service ID must be a string")
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage("Invalid service ID format"),
    body("status")
        .optional()
        .isIn(["BOOKED", "CANCELLED"])
        .withMessage("Status must be either BOOKED or CANCELLED"),
];

const appointmentUpdateSchema = [
    body("slot")
        .optional()
        .isString()
        .withMessage("Slot ID must be a string")
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage("Invalid slot ID format"),
    body("user")
        .optional()
        .isString()
        .withMessage("User ID must be a string")
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage("Invalid user ID format"),
    body("service")
        .optional()
        .isString()
        .withMessage("Service ID must be a string")
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage("Invalid service ID format"),
    body("status")
        .optional()
        .isIn(["BOOKED", "CANCELLED"])
        .withMessage("Status must be either BOOKED or CANCELLED"),
];

module.exports = {
    appointmentCreateSchema,
    appointmentUpdateSchema,
};
