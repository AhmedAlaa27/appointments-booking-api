// Packages imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Files imports
const connectDB = require("./config/db");
const { logger, loggerMiddleware } = require("./utils/logger");
const userRouter = require("./routes/user.route");
const serviceRouter = require("./routes/service.route");
const slotRouter = require("./routes/slot.route");
const appointmentRouter = require("./routes/appointment.route");
const { errorResponse, failResponse } = require("./utils/responses");
const { HTTP_STATUS_CODES } = require("./utils/httpStatus");

// Initialize express app
const app = express();

// Connect to the database
connectDB();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Routes setup
app.get("/", (req, res) => {
    logger.info("Root route accessed");
    res.send("Hello, world!");
});
app.use("/api/users", userRouter);
app.use("/api/services", serviceRouter);
app.use("/api/slots", slotRouter);
app.use("/api/appointments", appointmentRouter);

// Error handling middleware
app.use((error, req, res, next) => {
    logger.error(error.message || "Unknown error");
    if (error.statusCode == 500) {
        errorResponse(
            res,
            error.statusCode || 500,
            error.message || "Internal Server Error"
        );
    } else {
        failResponse(
            res,
            error.statusCode || 400,
            error.message || "Bad Request"
        );
    }
});

// 404 Not Found handler
app.use((req, res, next) => {
    errorResponse(
        res,
        HTTP_STATUS_CODES.NOT_FOUND,
        "The requested route was not found"
    );
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
});
