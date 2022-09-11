require("dotenv").config();
const express = require("express");
const app = express();
const registerRouter = require("./api/registrations/registrations.router");
const memberRouter = require("./api/members/members.router");
app.use(express.json());
var cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use(cors({
    credentials: true
}));


app.use("/api/register", registerRouter);
app.use("/api/members", memberRouter);


app.listen(process.env.APP_PORT, () => {
    console.log("server running on port:", process.env.APP_PORT);
})