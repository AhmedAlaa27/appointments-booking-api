const jwt = require("jsonwebtoken");

module.exports = async (payload) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_TTL || "1h",
    });
    return token;
};
