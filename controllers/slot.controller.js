const Slot = require("../models/slot.model");
const { logger } = require("../utils/logger");
const { HTTP_STATUS, HTTP_STATUS_CODES } = require("../utils/httpStatus");
const { successResponse } = require("../utils/responses");
const AppError = require("../utils/appError");
const asyncWrapper = require("../middlewares/asyncWrapper");

// Get all slots
const getAllSlots = asyncWrapper(async (req, res) => {
    logger.info("Getting all slots");
    const slots = await Slot.find().populate(
        "service",
        "name description durationMin"
    );
    return successResponse(
        res,
        HTTP_STATUS_CODES.OK,
        "Slots retrieved successfully",
        slots
    );
});

// Create a new slot
const createSlot = asyncWrapper(async (req, res, next) => {
    logger.info("Creating a new slot");
    const { service, startsAt, endsAt, isBooked } = req.body;

    // Validate required fields
    if (!service || !startsAt || !endsAt) {
        logger.error("Missing required fields for slot creation");
        const error = new AppError(
            "Missing required fields: service, startsAt, and endsAt are required",
            HTTP_STATUS_CODES.BAD_REQUEST,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    const newSlot = new Slot({ service, startsAt, endsAt, isBooked });
    await newSlot.save();
    logger.info("Slot created successfully");
    return successResponse(
        res,
        HTTP_STATUS_CODES.CREATED,
        "Slot created successfully",
        newSlot
    );
});

// Get slot by ID
const getSlotById = asyncWrapper(async (req, res, next) => {
    logger.info(`Getting slot with ID: ${req.params.id}`);
    const slot = await Slot.findById(req.params.id).populate(
        "service",
        "name description durationMin"
    );

    if (!slot) {
        logger.error(`Slot with ID: ${req.params.id} not found`);
        const error = new AppError(
            "Slot not found",
            HTTP_STATUS_CODES.NOT_FOUND,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    return successResponse(
        res,
        HTTP_STATUS_CODES.OK,
        "Slot retrieved successfully",
        slot
    );
});

// Update slot by ID
const updateSlot = asyncWrapper(async (req, res, next) => {
    logger.info(`Updating slot with ID: ${req.params.id}`);
    const slot = await Slot.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        { new: true, runValidators: true }
    );

    if (!slot) {
        logger.error(`Slot with ID: ${req.params.id} not found`);
        const error = new AppError(
            "Slot not found",
            HTTP_STATUS_CODES.NOT_FOUND,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    logger.info(`Slot with ID: ${req.params.id} updated successfully`);
    return successResponse(
        res,
        HTTP_STATUS_CODES.OK,
        "Slot updated successfully",
        slot
    );
});

// Delete slot by ID
const deleteSlot = asyncWrapper(async (req, res, next) => {
    logger.info(`Deleting slot with ID: ${req.params.id}`);
    const slot = await Slot.findByIdAndDelete(req.params.id);

    if (!slot) {
        logger.error(`Slot with ID: ${req.params.id} not found`);
        const error = new AppError(
            "Slot not found",
            HTTP_STATUS_CODES.NOT_FOUND,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    logger.info(`Slot with ID: ${req.params.id} deleted successfully`);
    return successResponse(
        res,
        HTTP_STATUS_CODES.OK,
        "Slot deleted successfully",
        slot
    );
});

module.exports = {
    getAllSlots,
    createSlot,
    getSlotById,
    updateSlot,
    deleteSlot,
};
