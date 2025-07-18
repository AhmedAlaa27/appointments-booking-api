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
const verifyToken = require("../middlewares/verifyToken");
const isAllowed = require("../middlewares/isAllowed");
const { USER_ROLES } = require("../utils/enums");

router
    .route("/")
    .get(getAllSlots)
    .post(
        verifyToken,
        isAllowed([USER_ROLES.ADMIN]),
        validateSchema(slotCreateSchema),
        createSlot
    );

router
    .route("/:id")
    .get(getSlotById)
    .patch(
        verifyToken,
        isAllowed([USER_ROLES.ADMIN]),
        validateSchema(slotUpdateSchema),
        updateSlot
    )
    .delete(verifyToken, isAllowed([USER_ROLES.ADMIN]), deleteSlot);

module.exports = router;
