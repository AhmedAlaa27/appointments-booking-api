const router = require("express").Router();

router
    .route("/")
    .get((req, res) => {
        res.send("Getting all services");
    })
    .post((req, res) => {
        res.send("Creating a new service");
    });

router
    .route("/:id")
    .get((req, res) => {
        res.send(`Getting service with ID: ${req.params.id}`);
    })
    .patch((req, res) => {
        res.send(`Updating service with ID: ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`Deleting service with ID: ${req.params.id}`);
    });

module.exports = router;
