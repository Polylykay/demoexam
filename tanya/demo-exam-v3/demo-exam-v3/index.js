import dotenv from "dotenv";
import express from "express";
import { join, resolve } from "path";
import loginRouter from "./routes/login.js";
import registrationRouter from "./routes/registration.js";
import adminRouter from "./routes/admin.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));


app.use("/", loginRouter);
app.use("/registration", registrationRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}`);
});
