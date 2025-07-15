const router = require("express").Router();
const {
    getAllServices,
    createService,
    getServiceById,
    updateService,
    deleteService,
} = require("../controllers/service.controller");

router.route("/").get(getAllServices).post(createService);

router
    .route("/:id")
    .get(getServiceById)
    .patch(updateService)
    .delete(deleteService);

module.exports = router;
