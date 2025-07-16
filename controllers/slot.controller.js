const Slot = require("../models/slot.model");
const { logger } = require("../utils/logger");
const { HTTP_STATUS_CODES } = require("../utils/httpStatus");
const { successResponse, errorResponse } = require("../utils/responses");

// Get all slots
const getAllSlots = async (req, res) => {
    try {
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
    } catch (error) {
        logger.error("Error getting all slots:", error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to retrieve slots",
            error
        );
    }
};

// Create a new slot
const createSlot = async (req, res) => {
    try {
        logger.info("Creating a new slot");
        const { service, startsAt, endsAt, isBooked } = req.body;
        const newSlot = new Slot({ service, startsAt, endsAt, isBooked });
        await newSlot.save();
        logger.info("Slot created successfully");
        return successResponse(
            res,
            HTTP_STATUS_CODES.CREATED,
            "Slot created successfully",
            newSlot
        );
    } catch (error) {
        logger.error("Error creating a new slot:", error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to create slot",
            error
        );
    }
};

// Get slot by ID
const getSlotById = async (req, res) => {
    try {
        logger.info(`Getting slot with ID: ${req.params.id}`);
        const slot = await Slot.findById(req.params.id).populate(
            "service",
            "name description durationMin"
        );
        return successResponse(
            res,
            HTTP_STATUS_CODES.OK,
            "Slot retrieved successfully",
            slot
        );
    } catch (error) {
        logger.error(`Error getting slot with ID ${req.params.id}:`, error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to retrieve slot",
            error
        );
    }
};

// Update slot by ID
const updateSlot = async (req, res) => {
    try {
        logger.info(`Updating slot with ID: ${req.params.id}`);
        const slot = await Slot.updateOne(
            { _id: req.params.id },
            { $set: { ...req.body } }
        );
        return successResponse(
            res,
            HTTP_STATUS_CODES.OK,
            "Slot updated successfully",
            slot
        );
    } catch (error) {
        logger.error(`Error updating slot with ID ${req.params.id}:`, error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to update slot",
            error
        );
    }
};

// Delete slot by ID
const deleteSlot = async (req, res) => {
    try {
        logger.info(`Deleting slot with ID: ${req.params.id}`);
        const slot = await Slot.findByIdAndDelete({ _id: req.params.id });
        return successResponse(
            res,
            HTTP_STATUS_CODES.OK,
            "Slot deleted successfully",
            slot
        );
    } catch (error) {
        logger.error(`Error deleting slot with ID ${req.params.id}:`, error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to delete slot",
            error
        );
    }
};

module.exports = {
    getAllSlots,
    createSlot,
    getSlotById,
    updateSlot,
    deleteSlot,
};
