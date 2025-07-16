const { HTTP_STATUS } = require("./httpStatus");
const { HTTP_STATUS_CODES } = require("./httpStatus");

const createResponse = (status, statusCode, message, data = null) => {
    return {
        statusCode,
        body: JSON.stringify({
            status,
            message,
            data,
        }),
    };
};

const successResponse = (
    statusCode = HTTP_STATUS_CODES.OK,
    message,
    data = null
) => {
    return createResponse(HTTP_STATUS.SUCCESS, statusCode, message, data);
};

const errorResponse = (
    statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    message,
    data = null
) => {
    return createResponse(HTTP_STATUS.ERROR, statusCode, message, data);
};

const failResponse = (
    statusCode = HTTP_STATUS_CODES.BAD_REQUEST,
    message,
    data = null
) => {
    return createResponse(HTTP_STATUS.FAIL, statusCode, message, data);
};

module.exports = {
    successResponse,
    errorResponse,
    failResponse,
};
