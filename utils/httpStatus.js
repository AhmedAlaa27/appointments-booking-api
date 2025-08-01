const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

const HTTP_STATUS = {
    SUCCESS: "success",
    ERROR: "error",
    FAIL: "fail",
};

module.exports = {
    HTTP_STATUS_CODES,
    HTTP_STATUS,
};
