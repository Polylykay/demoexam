const CarModel = require('../models/car')
const router = require('express').Router();

router.get("/", async (req, res) => {
    try {
        const cars = await CarModel.getCars();
        res.status(200).send(cars);
    } catch (e) {
        console.log(e)
        res.status(401).send("Error while retrieving cars");
    }
});
module.exports = router;
