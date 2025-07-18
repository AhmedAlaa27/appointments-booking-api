const { body } = require("express-validator");

const slotCreateSchema = [
    body("service")
        .notEmpty()
        .withMessage("Service ID is required")
        .isString()
        .withMessage("Service ID must be a string")
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage("Invalid service ID format"),
    body("startsAt")
        .notEmpty()
        .withMessage("Start time is required")
        .isISO8601()
        .withMessage("Start time must be a valid ISO 8601 date")
        .custom((value) => {
            if (new Date(value) <= new Date()) {
                throw new Error("Start time must be in the future");
            }
            return true;
        }),
    body("endsAt")
        .notEmpty()
        .withMessage("End time is required")
        .isISO8601()
        .withMessage("End time must be a valid ISO 8601 date"),
    body("endsAt").custom((value, { req }) => {
        const startsAt = new Date(req.body.startsAt);
        const endsAt = new Date(value);
        if (startsAt && endsAt <= startsAt) {
            throw new Error("End time must be after start time");
        }
        return true;
    }),
    body("isBooked")
        .optional()
        .isBoolean()
        .withMessage("isBooked must be a boolean"),
];

const slotUpdateSchema = [
    body("service")
        .optional()
        .isString()
        .withMessage("Service ID must be a string")
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage("Invalid service ID format"),
    body("startsAt")
        .optional()
        .isISO8601()
        .withMessage("Start time must be a valid ISO 8601 date"),
    body("endsAt")
        .optional()
        .isISO8601()
        .withMessage("End time must be a valid ISO 8601 date"),
    body("endsAt").custom((value, { req }) => {
        const startsAt = req.body.startsAt ? new Date(req.body.startsAt) : null;
        const endsAt = new Date(value);
        if (startsAt && endsAt <= startsAt) {
            throw new Error("End time must be after start time");
        }
        return true;
    }),
    body("isBooked")
        .optional()
        .isBoolean()
        .withMessage("isBooked must be a boolean"),
];

module.exports = {
    slotCreateSchema,
    slotUpdateSchema,
};
