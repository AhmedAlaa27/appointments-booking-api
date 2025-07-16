const User = require("../models/user.model");
const { logger } = require("../utils/logger");
const { successResponse, errorResponse } = require("../utils/responses");
const { HTTP_STATUS_CODES } = require("../utils/httpStatus");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        logger.info("Fetching all users");
        const users = await User.find();
        return successResponse(
            res,
            HTTP_STATUS_CODES.OK,
            "Users retrieved successfully",
            users
        );
    } catch (error) {
        logger.error("Error fetching users:", error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to retrieve users",
            error
        );
    }
};

// User login
const login = async (req, res) => {
    try {
        logger.info("User login attempt");
        return successResponse(
            res,
            HTTP_STATUS_CODES.OK,
            "User login successful"
        );
    } catch (error) {
        logger.error("Error during user login:", error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to login user",
            error
        );
    }
};

// User registration
const register = async (req, res) => {
    try {
        logger.info("User registration attempt");
        const { username, email, password } = req.body;

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
            user
        );
    } catch (error) {
        logger.error("Error during user registration:", error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to register user",
            error
        );
    }
};

module.exports = {
    getAllUsers,
    login,
    register,
};
