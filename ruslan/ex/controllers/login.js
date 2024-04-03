const User = require('../models/user.js')
const router = require('express').Router();


router.post("/", async (req, res) => {
	const { email, password } = req.body;
	const data = await User.checkUser(email, password);

	if (data?.id) {
		const header = btoa(`${data.id}:${data.role}`);
		return res.status(200).send(header);
	} else {
		res.status(401).send("Неправильный email или пароль");
	}
});

module.exports = router;
