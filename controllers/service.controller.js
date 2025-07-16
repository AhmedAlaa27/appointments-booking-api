const Service = require("../models/service.model");
const { logger } = require("../utils/logger");
const { HTTP_STATUS_CODES } = require("../utils/httpStatus");
const { successResponse, errorResponse } = require("../utils/responses");

// Get all services
const getAllServices = async (req, res) => {
    try {
        logger.info("Getting all services");
        const services = await Service.find();
        return successResponse(
            res,
            HTTP_STATUS_CODES.OK,
            "Services retrieved successfully",
            services
        );
    } catch (error) {
        logger.error("Error getting all services:", error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to retrieve services",
            error
        );
    }
};

// Create a new service
const createService = async (req, res) => {
    try {
        logger.info("Creating a new service");
        const { name, description, durationMin } = req.body;
        const newService = new Service({ name, description, durationMin });
        await newService.save();
        logger.info("Service created successfully");
        return successResponse(
            res,
            HTTP_STATUS_CODES.CREATED,
            "Service created successfully",
            newService
        );
    } catch (error) {
        logger.error("Error creating a new service:", error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to create service",
            error
        );
    }
};

// Get service by ID
const getServiceById = async (req, res) => {
    try {
        logger.info(`Getting service with ID: ${req.params.id}`);
        const service = await Service.findById(req.params.id);
        return successResponse(
            res,
            HTTP_STATUS_CODES.OK,
            "Service retrieved successfully",
            service
        );
    } catch (error) {
        logger.error(`Error getting service with ID ${req.params.id}:`, error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to retrieve service",
            error
        );
    }
};

// Update service by ID
const updateService = async (req, res) => {
    try {
        logger.info(`Updating service with ID: ${req.params.id}`);
        const service = await Service.updateOne(
            { _id: req.params.id },
            { $set: { ...req.body } }
        );
        return successResponse(
            res,
            HTTP_STATUS_CODES.OK,
            "Service updated successfully",
            service
        );
    } catch (error) {
        logger.error(`Error updating service with ID ${req.params.id}:`, error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to update service",
            error
        );
    }
};

// Delete service by ID
const deleteService = async (req, res) => {
    try {
        logger.info(`Deleting service with ID: ${req.params.id}`);
        const service = await Service.findByIdAndDelete({ _id: req.params.id });
        return successResponse(
            res,
            HTTP_STATUS_CODES.OK,
            "Service deleted successfully",
            service
        );
    } catch (error) {
        logger.error(`Error deleting service with ID ${req.params.id}:`, error);
        return errorResponse(
            res,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            "Failed to delete service",
            error
        );
    }
};

module.exports = {
    getAllServices,
    createService,
    getServiceById,
    updateService,
    deleteService,
};
