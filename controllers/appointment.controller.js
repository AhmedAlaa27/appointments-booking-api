// Get all appointments
const getAllAppointments = (req, res) => {
    res.send("Getting all appointments");
};

// Create a new appointment
const createAppointment = (req, res) => {
    res.send("Creating a new appointment");
};

// Get appointment by ID
const getAppointmentById = (req, res) => {
    res.send(`Getting appointment with ID: ${req.params.id}`);
};

// Update appointment by ID
const updateAppointment = (req, res) => {
    res.send(`Updating appointment with ID: ${req.params.id}`);
};

// Delete appointment by ID
const deleteAppointment = (req, res) => {
    res.send(`Deleting appointment with ID: ${req.params.id}`);
};

module.exports = {
    getAllAppointments,
    createAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
};
