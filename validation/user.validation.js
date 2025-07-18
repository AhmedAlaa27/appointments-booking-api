const { z } = require("zod");

// User registration validation schema
const userRegistrationSchema = z.object({
    body: z.object({
        username: z
            .string({
                required_error: "Username is required",
                invalid_type_error: "Username must be a string",
            })
            .min(3, "Username must be at least 3 characters long")
            .max(50, "Username must not exceed 50 characters"),

        email: z
            .string({
                required_error: "Email is required",
                invalid_type_error: "Email must be a string",
            })
            .email("Invalid email format")
            .max(100, "Email must not exceed 100 characters"),

        password: z
            .string({
                required_error: "Password is required",
                invalid_type_error: "Password must be a string",
            })
            .min(6, "Password must be at least 6 characters long")
            .max(100, "Password must not exceed 100 characters"),

        role: z
            .enum(["USER", "ADMIN"], {
                invalid_type_error: "Role must be either USER or ADMIN",
            })
            .optional(),
    }),
});

// User login validation schema
const userLoginSchema = z.object({
    body: z.object({
        email: z
            .string({
                required_error: "Email is required",
                invalid_type_error: "Email must be a string",
            })
            .email("Invalid email format"),

        password: z
            .string({
                required_error: "Password is required",
                invalid_type_error: "Password must be a string",
            })
            .min(1, "Password is required"),
    }),
});

// User update validation schema
const userUpdateSchema = z.object({
    body: z.object({
        username: z
            .string({
                invalid_type_error: "Username must be a string",
            })
            .min(3, "Username must be at least 3 characters long")
            .max(50, "Username must not exceed 50 characters")
            .optional(),

        email: z
            .string({
                invalid_type_error: "Email must be a string",
            })
            .email("Invalid email format")
            .max(100, "Email must not exceed 100 characters")
            .optional(),

        password: z
            .string({
                invalid_type_error: "Password must be a string",
            })
            .min(6, "Password must be at least 6 characters long")
            .max(100, "Password must not exceed 100 characters")
            .optional(),

        role: z
            .enum(["USER", "ADMIN"], {
                invalid_type_error: "Role must be either USER or ADMIN",
            })
            .optional(),
    }),
});

module.exports = {
    userRegistrationSchema,
    userLoginSchema,
    userUpdateSchema,
};
