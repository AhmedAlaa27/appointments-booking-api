const { HTTP_STATUS_CODES, HTTP_STATUS } = require("../utils/httpStatus");
const AppError = require("../utils/appError");

const validateSchema = (schema) => {
    return async (req, res, next) => {
        for (const key of schema) {
            const result = await key.run(req);
            if (!result.isEmpty()) {
                const appError = new AppError(
                    (message = result.array()[0].msg),
                    (statusCode = HTTP_STATUS_CODES.BAD_REQUEST),
                    (statusText = HTTP_STATUS.FAIL)
                );
                return next(appError);
            }
        }
        next();
    };
};

module.exports = validateSchema;
