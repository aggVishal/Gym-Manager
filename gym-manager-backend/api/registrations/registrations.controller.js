const { sign } = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { registerGym, getGyms, getGymById, getGymByEmail } = require("./registrations.service");

module.exports = {
    registerGym: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        registerGym(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    result: "Database connection error."
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    result: body
                });
            }
        })
    },

    getGyms: (req, res) => {
        const id = req.params.id;
        getGyms((err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    result: "Database connection error."
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    result: result
                });
            }
        })
    },

    getGymById: (req, res) => {
        const id = req.params.id;
        getGymById(id, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    result: "Database connection error."
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    result: result
                });
            }
        })
    },


    login: (req, res) => {
        const body = req.body;
        getGymByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    result: "Email is not registered!"
                })
            }
            const result = compareSync(body.password, results.password);

            if (result) {
                results.password = undefined;
                const jwt = sign({ result: results }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    result: "Login successfully!",
                    token: jwt
                });
            } else {
                return res.json({
                    success: 0,
                    result: "Incorrect Password!"
                });
            }
        });


    }
}