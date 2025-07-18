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
const verifyToken = require("../middlewares/verifyToken");
const isAllowed = require("../middlewares/isAllowed");
const { USER_ROLES } = require("../utils/enums");

router
    .route("/")
    .get(getAllServices)
    .post(
        verifyToken,
        isAllowed([USER_ROLES.ADMIN]),
        validateSchema(serviceCreateSchema),
        createService
    );

router
    .route("/:id")
    .get(getServiceById)
    .patch(
        verifyToken,
        isAllowed([USER_ROLES.ADMIN]),
        validateSchema(serviceUpdateSchema),
        updateService
    )
    .delete(verifyToken, isAllowed([USER_ROLES.ADMIN]), deleteService);

module.exports = router;
