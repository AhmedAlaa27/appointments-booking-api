const mongoose = require("mongoose");
const { logger } = require("../utils/logger");

let isConnected = false;

async function connectDB() {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 20,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            dbName: "appointments",
        });

        isConnected = true;

        logger.info(`✅ Connected to MongoDB: ${mongoose.connection.name}`);

        mongoose.connection.on("disconnected", () => {
            logger.warn("⚠️  MongoDB disconnected");
        });

        mongoose.connection.on("reconnected", () => {
            logger.info("🔄 MongoDB reconnected");
        });
    } catch (error) {
        logger.error("❌ Database connection error::", error);
        process.exit(1);
    }
}

module.exports = connectDB;
