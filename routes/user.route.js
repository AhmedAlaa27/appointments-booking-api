const router = require("express").Router();
const {
    getAllUsers,
    login,
    register,
} = require("../controllers/user.controller");
const validateSchema = require("../middlewares/validateSchema");
const {
    userRegistrationSchema,
    userLoginSchema,
    userUpdateSchema,
} = require("../validation/user.validation");

router.get("/", getAllUsers);
router.post("/login", validateSchema(userLoginSchema), login);
router.post("/register", validateSchema(userRegistrationSchema), register);

module.exports = router;
