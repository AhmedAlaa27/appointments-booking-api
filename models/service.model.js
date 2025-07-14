const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        durationMin: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
