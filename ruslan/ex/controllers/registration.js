const User = require('../models/user.js')
const router = require('express').Router();

router.post("/", async (req, res) => {
	const { full_name, email, password, phone, driver_license } = req.body;

	if (!full_name || !email || !password || !phone || !driver_license) {
		return res.status(400).send("Invalid data");
	}
	await User.createInstance({
		full_name,
		email,
		password,
		phone,
		driver_license,
	});
	return res.status(200).send("Successful registration");
});

module.exports = router;
