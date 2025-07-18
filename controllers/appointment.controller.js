const Appointment = require("../models/appointment.model");
const { logger } = require("../utils/logger");
const { HTTP_STATUS, HTTP_STATUS_CODES } = require("../utils/httpStatus");
const { successResponse } = require("../utils/responses");
const AppError = require("../utils/appError");
const asyncWrapper = require("../middlewares/asyncWrapper");

// Get all appointments
const getAllAppointments = asyncWrapper(async (req, res) => {
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
});

// Create a new appointment
const createAppointment = asyncWrapper(async (req, res, next) => {
    logger.info("Creating a new appointment");
    const { slot, user, service, status } = req.body;

    // Validate required fields
    if (!slot || !user || !service) {
        logger.error("Missing required fields for appointment creation");
        const error = new AppError(
            "Missing required fields: slot, user, and service are required",
            HTTP_STATUS_CODES.BAD_REQUEST,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    const newAppointment = new Appointment({ slot, user, service, status });
    await newAppointment.save();
    logger.info("Appointment created successfully");
    return successResponse(
        res,
        HTTP_STATUS_CODES.CREATED,
        "Appointment created successfully",
        newAppointment
    );
});

// Get appointment by ID
const getAppointmentById = asyncWrapper(async (req, res, next) => {
    logger.info(`Getting appointment with ID: ${req.params.id}`);
    const appointment = await Appointment.findById(req.params.id)
        .populate("user", "name email")
        .populate("service", "name description")
        .populate("slot", "startsAt endsAt");
    if (!appointment) {
        logger.error(`Appointment with ID: ${req.params.id} not found`);
        const error = new AppError(
            "Appointment not found",
            HTTP_STATUS_CODES.NOT_FOUND,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }
    return successResponse(
        res,
        HTTP_STATUS_CODES.OK,
        "Appointment retrieved successfully",
        appointment
    );
});

// Update appointment by ID
const updateAppointment = asyncWrapper(async (req, res, next) => {
    logger.info(`Updating appointment with ID: ${req.params.id}`);
    const appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        { new: true, runValidators: true }
    );

    if (!appointment) {
        logger.error(`Appointment with ID: ${req.params.id} not found`);
        const error = new AppError(
            "Appointment not found",
            HTTP_STATUS_CODES.NOT_FOUND,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    logger.info(`Appointment with ID: ${req.params.id} updated successfully`);
    return successResponse(
        res,
        HTTP_STATUS_CODES.OK,
        "Appointment updated successfully",
        appointment
    );
});

// Delete appointment by ID
const deleteAppointment = asyncWrapper(async (req, res, next) => {
    logger.info(`Deleting appointment with ID: ${req.params.id}`);
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
        logger.error(`Appointment with ID: ${req.params.id} not found`);
        const error = new AppError(
            "Appointment not found",
            HTTP_STATUS_CODES.NOT_FOUND,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    logger.info(`Appointment with ID: ${req.params.id} deleted successfully`);
    return successResponse(
        res,
        HTTP_STATUS_CODES.OK,
        "Appointment deleted successfully",
        appointment
    );
});

module.exports = {
    getAllAppointments,
    createAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
};
