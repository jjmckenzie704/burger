var express = require("express");

var router = express.Router();

//Import the model (burger.js) to use its database functions:
var burger = require("../models/burger.js")

//Create respective routes
router.get("/", function(req, res) {
    burger.all(function(data) {
        var burgerObject = {
            burgers: data
        };
        console.log(burgerObject);
        res.render("index", burgerObject);
    });
});

// Update the database with a brand new burger name, all the other columns get auto filled, such as ID and DEVOURED
router.post("/api/burgers", function(req, res) {
    burger.create([
        "burger_name"
    ], [
        req.body.burger_name
    ], function(result) {
        res.json({ id: result.insertID});
    });
});

//Update the database for a burger that is made and is now being devoured
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition set", condition);

    //Update function in the database (devoured to TRUE)
    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        console.log(req.body.devoured);

        //console.log(devoured)
        if (result.changedRows == 0) {
            return res.status(404).end();
        } 
        else {
            res.status(200).end()
        };
    });
});

module.exports = router;