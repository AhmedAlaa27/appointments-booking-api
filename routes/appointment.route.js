const router = require("express").Router();

router
    .route("/")
    .get((req, res) => {
        res.send("Getting all appointments");
    })
    .post((req, res) => {
        res.send("Creating a new appointment");
    });

router
    .route("/:id")
    .get((req, res) => {
        res.send(`Getting appointment with ID: ${req.params.id}`);
    })
    .patch((req, res) => {
        res.send(`Updating appointment with ID: ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`Deleting appointment with ID: ${req.params.id}`);
    });

module.exports = router;
