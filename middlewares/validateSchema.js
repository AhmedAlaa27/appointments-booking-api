const { ZodError } = require("zod");
const { HTTP_STATUS_CODES, HTTP_STATUS } = require("../utils/httpStatus");
const AppError = require("../utils/appError");

const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            next();
        } catch (error) {
            if (error instanceof ZodError || Array.isArray(error.errors)) {
                const errorMessages = error.errors.map((err) => {
                    const field = err.path.join(".");
                    return `${field}: ${err.message}`;
                });

                const validationError = new AppError(
                    `Validation failed: ${errorMessages.join(", ")}`,
                    HTTP_STATUS_CODES.BAD_REQUEST,
                    HTTP_STATUS.FAIL
                );

                return next(validationError);
            }

            const serverError = new AppError(
                "Internal server error during validation",
                HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                HTTP_STATUS.ERROR
            );

            return next(serverError);
        }
    };
};

module.exports = validateSchema;
