// Get all services
const getAllServices = (req, res) => {
    res.send("Getting all services");
};

// Create a new service
const createService = (req, res) => {
    res.send("Creating a new service");
};

// Get service by ID
const getServiceById = (req, res) => {
    res.send(`Getting service with ID: ${req.params.id}`);
};

// Update service by ID
const updateService = (req, res) => {
    res.send(`Updating service with ID: ${req.params.id}`);
};

// Delete service by ID
const deleteService = (req, res) => {
    res.send(`Deleting service with ID: ${req.params.id}`);
};

module.exports = {
    getAllServices,
    createService,
    getServiceById,
    updateService,
    deleteService,
};
