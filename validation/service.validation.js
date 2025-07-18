const { z } = require("zod");

// Service creation validation schema
const serviceCreateSchema = z.object({
    body: z.object({
        name: z
            .string({
                required_error: "Service name is required",
                invalid_type_error: "Service name must be a string",
            })
            .min(1, "Service name cannot be empty")
            .max(100, "Service name must not exceed 100 characters"),

        description: z
            .string({
                required_error: "Service description is required",
                invalid_type_error: "Service description must be a string",
            })
            .min(1, "Service description cannot be empty")
            .max(500, "Service description must not exceed 500 characters"),

        durationMin: z
            .number({
                required_error: "Duration in minutes is required",
                invalid_type_error: "Duration must be a number",
            })
            .int("Duration must be a whole number")
            .min(5, "Duration must be at least 5 minutes")
            .max(480, "Duration must not exceed 480 minutes (8 hours)"),
    }),
});

// Service update validation schema
const serviceUpdateSchema = z.object({
    body: z.object({
        name: z
            .string({
                invalid_type_error: "Service name must be a string",
            })
            .min(1, "Service name cannot be empty")
            .max(100, "Service name must not exceed 100 characters")
            .optional(),

        description: z
            .string({
                invalid_type_error: "Service description must be a string",
            })
            .min(1, "Service description cannot be empty")
            .max(500, "Service description must not exceed 500 characters")
            .optional(),

        durationMin: z
            .number({
                invalid_type_error: "Duration must be a number",
            })
            .int("Duration must be a whole number")
            .min(5, "Duration must be at least 5 minutes")
            .max(480, "Duration must not exceed 480 minutes (8 hours)")
            .optional(),
    }),
});

module.exports = {
    serviceCreateSchema,
    serviceUpdateSchema,
};
