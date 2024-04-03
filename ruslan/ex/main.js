const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000
const loginRouter = require('./controllers/login')
const registrationRouter = require('./controllers/registration')
const applicationsRouter = require('./controllers/applications')
const carsRouter = require('./controllers/car')

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());

app.use("/login", loginRouter);
app.use("/register", registrationRouter);
app.use("/applications", applicationsRouter);
app.use("/cars", carsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
