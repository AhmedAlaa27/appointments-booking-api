const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Getting all users");
});

router.post("/login", (req, res) => {
    res.send("User login");
});

router.post("/register", (req, res) => {
    res.send("User registration");
});

module.exports = router;
