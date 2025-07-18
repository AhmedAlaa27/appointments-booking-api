class AppError extends Error {
    constructor(message, statusCode, statusText) {
        super(message);
        this.statusCode = statusCode;
        this.statusText = statusText;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }
    }
}

module.exports = AppError;
