require("dotenv").config();
const express = require("express");
const app = express();
const registerRouter = require("./api/registrations/registrations.router");
const memberRouter = require("./api/members/members.router");
const s3Router = require("./api/s3/s3.router");
app.use(express.json());
var cors = require('cors')
const cookieParser = require('cookie-parser')
    // const fetch = require("node-fetch");

app.use(cookieParser());
app.use(cors({
    credentials: true
}));

// app.use(fetch());


app.use("/api/register", registerRouter);
app.use("/api/members", memberRouter);
app.use("/api/s3", s3Router);

// app.get('/s3url/get', (res, req) => {

// })


app.listen(process.env.APP_PORT, () => {
    console.log("server running on port:", process.env.APP_PORT);
})