const mongoose = require("mongoose");
const { APPOINTMENT_STATUS } = require("../utils/enums");

const appointmentSchema = new mongoose.Schema(
    {
        slot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Slot",
            unique: true,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        status: {
            type: String,
            enum: [APPOINTMENT_STATUS.BOOKED, APPOINTMENT_STATUS.CANCELLED],
            default: APPOINTMENT_STATUS.BOOKED,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
