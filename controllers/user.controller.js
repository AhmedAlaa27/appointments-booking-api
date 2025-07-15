// Get all users
const getAllUsers = (req, res) => {
    res.send("Getting all users");
};

// User login
const login = (req, res) => {
    res.send("User login");
};

// User registration
const register = (req, res) => {
    res.send("User registration");
};

module.exports = {
    getAllUsers,
    login,
    register,
};
