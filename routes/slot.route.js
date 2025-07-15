const router = require("express").Router();
const {
    getAllSlots,
    createSlot,
    getSlotById,
    updateSlot,
    deleteSlot,
} = require("../controllers/slot.controller");

router.route("/").get(getAllSlots).post(createSlot);

router.route("/:id").get(getSlotById).patch(updateSlot).delete(deleteSlot);

module.exports = router;
