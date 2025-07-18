const { body } = require("express-validator");

const serviceCreateSchema = [
    body("name")
        .notEmpty()
        .withMessage("Service name is required")
        .isString()
        .withMessage("Service name must be a string")
        .isLength({ min: 5, max: 100 })
        .withMessage("Service name must be between 5 and 100 characters"),
    body("description")
        .notEmpty()
        .withMessage("Service description is required")
        .isString()
        .withMessage("Service description must be a string")
        .isLength({ min: 1, max: 500 })
        .withMessage(
            "Service description must be between 1 and 500 characters"
        ),
    body("durationMin")
        .notEmpty()
        .withMessage("Service duration is required")
        .isInt({ min: 5, max: 480 })
        .withMessage("Duration must be a whole number between 5 and 480"),
];

const serviceUpdateSchema = [
    body("name")
        .optional()
        .isString()
        .withMessage("Service name must be a string")
        .isLength({ min: 1, max: 100 })
        .withMessage("Service name must be between 1 and 100 characters"),
    body("description")
        .optional()
        .isString()
        .withMessage("Service description must be a string")
        .isLength({ min: 1, max: 500 })
        .withMessage(
            "Service description must be between 1 and 500 characters"
        ),
    body("durationMin")
        .optional()
        .isInt({ min: 5, max: 480 })
        .withMessage("Duration must be a whole number between 5 and 480"),
];

module.exports = {
    serviceCreateSchema,
    serviceUpdateSchema,
};
