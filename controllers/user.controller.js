const User = require("../models/user.model");
const { logger } = require("../utils/logger");
const { successResponse } = require("../utils/responses");
const { HTTP_STATUS, HTTP_STATUS_CODES } = require("../utils/httpStatus");
const AppError = require("../utils/appError");
const asyncWrapper = require("../middlewares/asyncWrapper");

// Get all users
const getAllUsers = asyncWrapper(async (req, res) => {
    logger.info("Fetching all users");
    const users = await User.find();
    return successResponse(
        res,
        HTTP_STATUS_CODES.OK,
        "Users retrieved successfully",
        users
    );
});

// User login
const login = asyncWrapper(async (req, res, next) => {
    logger.info("User login attempt");
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        logger.error("Missing required fields for user login");
        const error = new AppError(
            "Missing required fields: email and password are required",
            HTTP_STATUS_CODES.BAD_REQUEST,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    // TODO: Implement actual login logic here
    logger.info("User login successful");
    return successResponse(res, HTTP_STATUS_CODES.OK, "User login successful");
});

// User registration
const register = asyncWrapper(async (req, res, next) => {
    logger.info("User registration attempt");
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
        logger.error("Missing required fields for user registration");
        const error = new AppError(
            "Missing required fields: username, email, and password are required",
            HTTP_STATUS_CODES.BAD_REQUEST,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    // Don't log passwords in production - security risk!
    logger.info(`Registering user: ${username}, email: ${email}`);

    // Create user with object notation (not constructor parameters)
    const user = new User({ username, email, password });
    await user.save();

    logger.info("User registered successfully");
    return successResponse(
        res,
        HTTP_STATUS_CODES.CREATED,
        "User registration successful",
        { id: user._id, username: user.username, email: user.email }
    );
});

module.exports = {
    getAllUsers,
    login,
    register,
};
