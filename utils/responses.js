const { HTTP_STATUS } = require("./httpStatus");
const { HTTP_STATUS_CODES } = require("./httpStatus");

// Core response builder (no stringify needed in Express)
const createResponse = (res, status, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        status,
        message,
        data,
    });
};

const successResponse = (
    res,
    statusCode = HTTP_STATUS_CODES.OK,
    message,
    data = null
) => {
    return createResponse(res, HTTP_STATUS.SUCCESS, statusCode, message, data);
};

const errorResponse = (
    res,
    statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    message,
    data = null
) => {
    return createResponse(res, HTTP_STATUS.ERROR, statusCode, message, data);
};

const failResponse = (
    res,
    statusCode = HTTP_STATUS_CODES.BAD_REQUEST,
    message,
    data = null
) => {
    return createResponse(res, HTTP_STATUS.FAIL, statusCode, message, data);
};

module.exports = {
    successResponse,
    errorResponse,
    failResponse,
};
