import { Router } from "express";
import User from "../models/user.js";
const router = Router();


router.post("/", async (req, res) => {
	const { email, password } = req.body;
	const data = await User.checkUser(email, password);
	console.log(data);

	if (data.user_exists) {
		return res.redirect("/admin");
	}

	if (!data.user_exists) {
		res.status(401).send("Неправильный email или пароль");
	}
});

export default router;
