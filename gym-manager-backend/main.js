require("dotenv").config();
const express = require("express");
const app = express();
const registerRouter = require("./api/registrations/registrations.router");
app.use(express.json());



app.use("/api/register", registerRouter);


app.listen(process.env.APP_PORT, () => {
    console.log("server running on port:", process.env.APP_PORT);
})