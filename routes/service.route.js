const router = require("express").Router();
const {
    getAllServices,
    createService,
    getServiceById,
    updateService,
    deleteService,
} = require("../controllers/service.controller");
const validateSchema = require("../middlewares/validateSchema");
const {
    serviceCreateSchema,
    serviceUpdateSchema,
} = require("../validation/service.validation");

router
    .route("/")
    .get(getAllServices)
    .post(validateSchema(serviceCreateSchema), createService);

router
    .route("/:id")
    .get(getServiceById)
    .patch(validateSchema(serviceUpdateSchema), updateService)
    .delete(deleteService);

module.exports = router;
