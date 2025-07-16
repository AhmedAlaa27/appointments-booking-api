const Appointment = require("../models/appointment.model");
const { logger } = require("../utils/logger");
const { HTTP_STATUS_CODES } = require("../utils/httpStatus");
const { successResponse, errorResponse } = require("../utils/responses");

// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        logger.info("Getting all appointments");
        const appointments = await Appointment.find()
            .populate("user", "name email")
            .populate("service", "name description")
            .populate("slot", "startsAt endsAt");
        return successResponse(
            res,
            HTTP_STATUS_CODES.OK,
            "Appointments retrieved successfully",
            appointments
        );
    } catch (error) {
        logger.error("Error getting all appointments:", error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to retrieve appointments",
            error
        );
    }
};

// Create a new appointment
const createAppointment = async (req, res) => {
    try {
        logger.info("Creating a new appointment");
        const { slot, user, service, status } = req.body;
        const newAppointment = new Appointment({ slot, user, service, status });
        await newAppointment.save();
        logger.info("Appointment created successfully");
        return successResponse(
            res,
            HTTP_STATUS_CODES.CREATED,
            "Appointment created successfully",
            newAppointment
        );
    } catch (error) {
        logger.error("Error creating a new appointment:", error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to create appointment",
            error
        );
    }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
    try {
        logger.info(`Getting appointment with ID: ${req.params.id}`);
        const appointment = await Appointment.findById(req.params.id)
            .populate("user", "name email")
            .populate("service", "name description")
            .populate("slot", "startsAt endsAt");
        return successResponse(
            res,
            HTTP_STATUS_CODES.OK,
            "Appointment retrieved successfully",
            appointment
        );
    } catch (error) {
        logger.error(
            `Error getting appointment with ID ${req.params.id}:`,
            error
        );
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to retrieve appointment",
            error
        );
    }
};

// Update appointment by ID
const updateAppointment = async (req, res) => {
    try {
        logger.info(`Updating appointment with ID: ${req.params.id}`);
        const appointment = await Appointment.updateOne(
            { _id: req.params.id },
            { $set: { ...req.body } }
        );
        return successResponse(
            res,
            HTTP_STATUS_CODES.OK,
            "Appointment updated successfully",
            appointment
        );
    } catch (error) {
        logger.error(
            `Error updating appointment with ID ${req.params.id}:`,
            error
        );
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to update appointment",
            error
        );
    }
};

// Delete appointment by ID
const deleteAppointment = async (req, res) => {
    try {
        logger.info(`Deleting appointment with ID: ${req.params.id}`);
        const appointment = await Appointment.findByIdAndDelete({
            _id: req.params.id,
        });
        return successResponse(
            res,
            HTTP_STATUS_CODES.OK,
            "Appointment deleted successfully",
            appointment
        );
    } catch (error) {
        logger.error(
            `Error deleting appointment with ID ${req.params.id}:`,
            error
        );
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to delete appointment",
            error
        );
    }
};

module.exports = {
    getAllAppointments,
    createAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
};
