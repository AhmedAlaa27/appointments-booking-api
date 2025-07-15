// Get all slots
const getAllSlots = (req, res) => {
    res.send("Getting all slots");
};

// Create a new slot
const createSlot = (req, res) => {
    res.send("Creating a new slot");
};

// Get slot by ID
const getSlotById = (req, res) => {
    res.send(`Getting slot with ID: ${req.params.id}`);
};

// Update slot by ID
const updateSlot = (req, res) => {
    res.send(`Updating slot with ID: ${req.params.id}`);
};

// Delete slot by ID
const deleteSlot = (req, res) => {
    res.send(`Deleting slot with ID: ${req.params.id}`);
};

module.exports = {
    getAllSlots,
    createSlot,
    getSlotById,
    updateSlot,
    deleteSlot,
};
