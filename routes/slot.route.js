const router = require("express").Router();
const {
    getAllSlots,
    createSlot,
    getSlotById,
    updateSlot,
    deleteSlot,
} = require("../controllers/slot.controller");
const validateSchema = require("../middlewares/validateSchema");
const {
    slotCreateSchema,
    slotUpdateSchema,
} = require("../validation/slot.validation");

router
    .route("/")
    .get(getAllSlots)
    .post(validateSchema(slotCreateSchema), createSlot);

router
    .route("/:id")
    .get(getSlotById)
    .patch(validateSchema(slotUpdateSchema), updateSlot)
    .delete(deleteSlot);

module.exports = router;
