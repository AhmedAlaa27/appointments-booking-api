const { logger } = require("../utils/logger");

// Get all users
const getAllUsers = (req, res) => {
    try {
        res.send("Getting all users");
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};

// User login
const login = (req, res) => {
    try {
        res.send("User login");
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};

// User registration
const register = (req, res) => {
    try {
        res.send("User registration");
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};

module.exports = {
    getAllUsers,
    login,
    register,
};
