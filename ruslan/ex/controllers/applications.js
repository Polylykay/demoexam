const ApplicationModel = require('../models/application')
const router = require('express').Router();


router.post("/", async (req, res) => {
    try {
        const [userId, userRole] = atob(req.headers.authorization).split(':').map(el => +el);
        if (userId && typeof userId === 'number') {
            const { carId, bookingDate } = req.body;
            if (!carId || !bookingDate) {
                return res.status(400).send("Invalid data");
            }
            await ApplicationModel.createInstance({userId, carId, bookingDate})
	        return res.status(200).send("Successfully created application");
        } else {
            res.status(401).send("Вход в систему не выполнен");
        }
    } catch (e) {
        console.log(e)
        res.status(401).send("Вход в систему не выполнен");
    }

});

router.get("/", async (req, res) => {
    try {
        const [userId, userRole] = atob(req.headers.authorization).split(':').map(el => +el);
        console.log(userId, userRole)
        if (userId && typeof userId === 'number') {
            if (userRole === 0) {
                const applications = await ApplicationModel.getAllApplications()
                return res.status(200).send(applications);
            } else {
                const applications = await ApplicationModel.getUserApplications(userId)
                return res.status(200).send(applications);
            }
        } else {
            res.status(401).send("Вход в систему не выполнен");
        }
    } catch (e) {
        console.log(e)
        res.status(401).send("Вход в систему не выполнен");
    }
});
module.exports = router;
