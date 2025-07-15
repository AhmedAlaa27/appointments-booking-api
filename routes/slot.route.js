const router = require("express").Router();

router
    .route("/")
    .get((req, res) => {
        res.send("Getting all slots");
    })
    .post((req, res) => {
        res.send("Creating a new slot");
    });

router
    .route("/:id")
    .get((req, res) => {
        res.send(`Getting slot with ID: ${req.params.id}`);
    })
    .patch((req, res) => {
        res.send(`Updating slot with ID: ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`Deleting slot with ID: ${req.params.id}`);
    });

module.exports = router;
