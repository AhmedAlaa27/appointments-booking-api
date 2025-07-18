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

router
    .route("/")
    .get(getAllAppointments)
    .post(validateSchema(appointmentCreateSchema), createAppointment);

router
    .route("/:id")
    .get(getAppointmentById)
    .patch(validateSchema(appointmentUpdateSchema), updateAppointment)
    .delete(deleteAppointment);

module.exports = router;
