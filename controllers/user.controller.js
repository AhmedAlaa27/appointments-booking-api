const User = require("../models/user.model");
const { logger } = require("../utils/logger");
const { successResponse } = require("../utils/responses");
const { HTTP_STATUS, HTTP_STATUS_CODES } = require("../utils/httpStatus");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const asyncWrapper = require("../middlewares/asyncWrapper");
const generateJWT = require("../utils/generateJWT");

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

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        logger.error("User not found");
        const error = new AppError(
            "User not found",
            HTTP_STATUS_CODES.NOT_FOUND,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        logger.error("Invalid password");
        const error = new AppError(
            "Invalid password",
            HTTP_STATUS_CODES.UNAUTHORIZED,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    // Generate JWT token
    const token = await generateJWT({
        email: user.email,
        id: user._id,
        role: user.role,
    });
    user.token = token;

    logger.info("User login successful");
    return successResponse(res, HTTP_STATUS_CODES.OK, "User login successful", {
        user,
    });
});

// User registration
const register = asyncWrapper(async (req, res, next) => {
    logger.info("User registration attempt");
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        logger.error("User already exists with this email");
        const error = new AppError(
            "User already exists with this email",
            HTTP_STATUS_CODES.BAD_REQUEST,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
        logger.error("Error hashing password");
        const error = new AppError(
            "Error hashing password",
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            HTTP_STATUS.ERROR
        );
        return next(error);
    }

    // Create new User
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    const token = await generateJWT({
        email: user.email,
        id: user._id,
        role: user.role,
    });
    user.token = token;

    logger.info("User registered successfully");
    return successResponse(
        res,
        HTTP_STATUS_CODES.CREATED,
        "User registration successful",
        { user }
    );
});

module.exports = {
    getAllUsers,
    login,
    register,
};
