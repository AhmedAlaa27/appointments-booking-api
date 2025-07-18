const Service = require("../models/service.model");
const { logger } = require("../utils/logger");
const { HTTP_STATUS, HTTP_STATUS_CODES } = require("../utils/httpStatus");
const { successResponse } = require("../utils/responses");
const AppError = require("../utils/appError");
const asyncWrapper = require("../middlewares/asyncWrapper");

// Get all services
const getAllServices = asyncWrapper(async (req, res) => {
    logger.info("Getting all services");
    const services = await Service.find();
    return successResponse(
        res,
        HTTP_STATUS_CODES.OK,
        "Services retrieved successfully",
        services
    );
});

// Create a new service
const createService = asyncWrapper(async (req, res, next) => {
    logger.info("Creating a new service");
    const { name, description, durationMin } = req.body;

    // Validate required fields
    if (!name || !description || !durationMin) {
        logger.error("Missing required fields for service creation");
        const error = new AppError(
            "Missing required fields: name, description, and durationMin are required",
            HTTP_STATUS_CODES.BAD_REQUEST,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    const newService = new Service({ name, description, durationMin });
    await newService.save();
    logger.info("Service created successfully");
    return successResponse(
        res,
        HTTP_STATUS_CODES.CREATED,
        "Service created successfully",
        newService
    );
});

// Get service by ID
const getServiceById = asyncWrapper(async (req, res, next) => {
    logger.info(`Getting service with ID: ${req.params.id}`);
    const service = await Service.findById(req.params.id);

    if (!service) {
        logger.error(`Service with ID: ${req.params.id} not found`);
        const error = new AppError(
            "Service not found",
            HTTP_STATUS_CODES.NOT_FOUND,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    return successResponse(
        res,
        HTTP_STATUS_CODES.OK,
        "Service retrieved successfully",
        service
    );
});

// Update service by ID
const updateService = asyncWrapper(async (req, res, next) => {
    logger.info(`Updating service with ID: ${req.params.id}`);
    const service = await Service.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        { new: true, runValidators: true }
    );

    if (!service) {
        logger.error(`Service with ID: ${req.params.id} not found`);
        const error = new AppError(
            "Service not found",
            HTTP_STATUS_CODES.NOT_FOUND,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    logger.info(`Service with ID: ${req.params.id} updated successfully`);
    return successResponse(
        res,
        HTTP_STATUS_CODES.OK,
        "Service updated successfully",
        service
    );
});

// Delete service by ID
const deleteService = asyncWrapper(async (req, res, next) => {
    logger.info(`Deleting service with ID: ${req.params.id}`);
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
        logger.error(`Service with ID: ${req.params.id} not found`);
        const error = new AppError(
            "Service not found",
            HTTP_STATUS_CODES.NOT_FOUND,
            HTTP_STATUS.FAIL
        );
        return next(error);
    }

    logger.info(`Service with ID: ${req.params.id} deleted successfully`);
    return successResponse(
        res,
        HTTP_STATUS_CODES.OK,
        "Service deleted successfully",
        service
    );
});

module.exports = {
    getAllServices,
    createService,
    getServiceById,
    updateService,
    deleteService,
};
