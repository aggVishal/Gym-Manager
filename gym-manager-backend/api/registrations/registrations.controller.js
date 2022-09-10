const { genSaltSync, hashSync } = require("bcrypt");
const { registerGym, getGyms, getGymById } = require("./registrations.service");

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
                    user: body,
                    result: result
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
            }
            if (!result) {
                return res.status(200).json({
                    success: 0,
                    result: result
                })
            } else {
                return res.status(200).json({
                    success: 1,
                    result: result
                });
            }
        })
    }
}