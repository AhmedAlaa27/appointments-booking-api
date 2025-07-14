const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const logger = require("pino")({
    transport: { target: "pino-pretty", options: { colorize: true } },
});
require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    logger.info("Root route accessed");
    res.send("Hello, world!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});
