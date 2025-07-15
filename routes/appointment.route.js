const router = require("express").Router();
const {
    getAllAppointments,
    createAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
} = require("../controllers/appointment.controller");

router.route("/").get(getAllAppointments).post(createAppointment);

router
    .route("/:id")
    .get(getAppointmentById)
    .patch(updateAppointment)
    .delete(deleteAppointment);

module.exports = router;
