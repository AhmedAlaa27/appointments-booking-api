const { z } = require("zod");

// Slot creation validation schema
const slotCreateSchema = z
    .object({
        body: z.object({
            service: z
                .string({
                    required_error: "Service ID is required",
                    invalid_type_error: "Service ID must be a string",
                })
                .regex(/^[0-9a-fA-F]{24}$/, "Invalid service ID format"),

            startsAt: z
                .string({
                    required_error: "Start time is required",
                    invalid_type_error: "Start time must be a string",
                })
                .datetime(
                    "Invalid start time format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)"
                )
                .refine((date) => new Date(date) > new Date(), {
                    message: "Start time must be in the future",
                }),

            endsAt: z
                .string({
                    required_error: "End time is required",
                    invalid_type_error: "End time must be a string",
                })
                .datetime(
                    "Invalid end time format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)"
                ),

            isBooked: z
                .boolean({
                    invalid_type_error: "isBooked must be a boolean",
                })
                .optional(),
        }),
    })
    .refine(
        (data) => {
            const startTime = new Date(data.body.startsAt);
            const endTime = new Date(data.body.endsAt);
            return endTime > startTime;
        },
        {
            message: "End time must be after start time",
            path: ["body", "endsAt"],
        }
    );

// Slot update validation schema
const slotUpdateSchema = z
    .object({
        body: z.object({
            service: z
                .string({
                    invalid_type_error: "Service ID must be a string",
                })
                .regex(/^[0-9a-fA-F]{24}$/, "Invalid service ID format")
                .optional(),

            startsAt: z
                .string({
                    invalid_type_error: "Start time must be a string",
                })
                .datetime(
                    "Invalid start time format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)"
                )
                .optional(),

            endsAt: z
                .string({
                    invalid_type_error: "End time must be a string",
                })
                .datetime(
                    "Invalid end time format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)"
                )
                .optional(),

            isBooked: z
                .boolean({
                    invalid_type_error: "isBooked must be a boolean",
                })
                .optional(),
        }),
    })
    .refine(
        (data) => {
            const { startsAt, endsAt } = data.body;
            if (startsAt && endsAt) {
                const startTime = new Date(startsAt);
                const endTime = new Date(endsAt);
                return endTime > startTime;
            }
            return true;
        },
        {
            message: "End time must be after start time",
            path: ["body", "endsAt"],
        }
    );

module.exports = {
    slotCreateSchema,
    slotUpdateSchema,
};
