const express = require("express");
const cors = require("cors");
const logger = require("pino")({
    transport: { target: "pino-pretty", options: { colorize: true } },
});
require("dotenv").config();

const app = express();

app.use(cors);
app.use(express.json());

app.get("/", (req, res) => {
    logger.info("Root route accessed");
    res.send("Hello, world!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
