const { z } = require("zod");

// Appointment creation validation schema
const appointmentCreateSchema = z.object({
    body: z.object({
        slot: z
            .string({
                required_error: "Slot ID is required",
                invalid_type_error: "Slot ID must be a string",
            })
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid slot ID format"),

        user: z
            .string({
                required_error: "User ID is required",
                invalid_type_error: "User ID must be a string",
            })
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),

        service: z
            .string({
                required_error: "Service ID is required",
                invalid_type_error: "Service ID must be a string",
            })
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid service ID format"),

        status: z
            .enum(["BOOKED", "CANCELLED"], {
                invalid_type_error: "Status must be either BOOKED or CANCELLED",
            })
            .optional(),
    }),
});

// Appointment update validation schema
const appointmentUpdateSchema = z.object({
    body: z.object({
        slot: z
            .string({
                invalid_type_error: "Slot ID must be a string",
            })
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid slot ID format")
            .optional(),

        user: z
            .string({
                invalid_type_error: "User ID must be a string",
            })
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format")
            .optional(),

        service: z
            .string({
                invalid_type_error: "Service ID must be a string",
            })
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid service ID format")
            .optional(),

        status: z
            .enum(["BOOKED", "CANCELLED"], {
                invalid_type_error: "Status must be either BOOKED or CANCELLED",
            })
            .optional(),
    }),
});

module.exports = {
    appointmentCreateSchema,
    appointmentUpdateSchema,
};
