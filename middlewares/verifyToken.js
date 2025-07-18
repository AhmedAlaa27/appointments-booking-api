const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { HTTP_STATUS_CODES, HTTP_STATUS } = require("../utils/httpStatus");

const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        const error = new AppError(
            "No token provided",
            HTTP_STATUS_CODES.UNAUTHORIZED,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }
    token = token.split(" ")[1]; // Remove 'Bearer' prefix
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            const error = new AppError(
                "Failed to authenticate token",
                HTTP_STATUS_CODES.UNAUTHORIZED,
                HTTP_STATUS.FAIL
            );
            return next(error);
        }
        req.user = decoded; // Attach user info to request object
        next();
    });
};

module.exports = verifyToken;
