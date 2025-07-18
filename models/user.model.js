const mongoose = require("mongoose");
const { USER_ROLES } = require("../utils/enums");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: [USER_ROLES.USER, USER_ROLES.ADMIN],
            default: USER_ROLES.USER,
        },
        token: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
