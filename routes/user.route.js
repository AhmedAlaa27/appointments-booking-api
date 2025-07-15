const router = require("express").Router();
const {
    getAllUsers,
    login,
    register,
} = require("../controllers/user.controller");

router.get("/", getAllUsers);
router.post("/login", login);
router.post("/register", register);

module.exports = router;
