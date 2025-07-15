const mongoose = require("mongoose");
let isConnected = false;

async function connectDB() {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
    isConnected = true;
}

module.exports = connectDB;
