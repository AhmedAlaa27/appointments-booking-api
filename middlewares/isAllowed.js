const AppError = require("../utils/appError");
const { HTTP_STATUS_CODES, HTTP_STATUS } = require("../utils/httpStatus");

const isAllowed = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            const error = new AppError(
                "You are not allowed to perform this action",
                HTTP_STATUS_CODES.FORBIDDEN,
                HTTP_STATUS.FAIL
            );
            return next(error);
        }
        next();
    };
};

module.exports = isAllowed;
