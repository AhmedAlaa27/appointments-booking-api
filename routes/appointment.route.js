const router = require("express").Router();
const {
    getAllAppointments,
    createAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
} = require("../controllers/appointment.controller");
const validateSchema = require("../middlewares/validateSchema");
const {
    appointmentCreateSchema,
    appointmentUpdateSchema,
} = require("../validation/appointment.validation");
const verifyToken = require("../middlewares/verifyToken");
const isAllowed = require("../middlewares/isAllowed");
const { USER_ROLES } = require("../utils/enums");

router
    .route("/")
    .get(getAllAppointments)
    .post(
        verifyToken,
        isAllowed([USER_ROLES.ADMIN, USER_ROLES.USER]),
        validateSchema(appointmentCreateSchema),
        createAppointment
    );

router
    .route("/:id")
    .get(getAppointmentById)
    .patch(
        verifyToken,
        isAllowed([USER_ROLES.ADMIN, USER_ROLES.USER]),
        validateSchema(appointmentUpdateSchema),
        updateAppointment
    )
    .delete(verifyToken, isAllowed([USER_ROLES.ADMIN]), deleteAppointment);

module.exports = router;
