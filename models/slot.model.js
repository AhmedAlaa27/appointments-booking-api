const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
    {
        service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        startsAt: { type: Date, required: true },
        endsAt: { type: Date, required: true },
        isBooked: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Slot", slotSchema);
