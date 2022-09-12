const { sign, verify } = require("jsonwebtoken");
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
            } else {
                return res.status(200).json({
                    success: 1,
                    message: "Gym registered successfully.",
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
            } else {
                return res.status(200).json({
                    success: 1,
                    message: "success",
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
            }
            if (result.length == 0) {
                return res.json({
                    success: 0,
                    message: "Gym Id does not exist.",
                    result: {}
                })
            } else {
                return res.status(200).json({
                    success: 1,
                    message: "success",
                    result: result[0]
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
                    message: "Email is either incorrect or not registered!",
                    result: {}
                })
            }
            const result = compareSync(body.password, results.password);

            if (result) {
                results.password = undefined;
                const jwt = sign({ result: results }, process.env.JWT_KEY, {
                    expiresIn: "1hr"
                });
                // res.cookie('jwt', jwt, {
                //     maxAge: 60 * 60 * 1000, // 1 hr is max age of jwt token as a cookie
                //     httpOnly: true
                // });
                // res.cookie('gymId', results.gymId, {
                //     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days is max age of gymId as a cookie
                //     httpOnly: true
                // });
                return res.json({
                    success: 1,
                    message: "Login successfully!",
                    token: jwt
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Incorrect Password!",
                    token: ""
                });
            }
        });


    },

    loginUsingToken: (req, res) => {
        const token = req.body.token;
        if (token) {
            const decode = verify(token, process.env.JWT_KEY, (err, result) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: err.message,
                        result: {}
                    })
                } else {
                    res.json({
                        success: 1,
                        message: "Token is valid.",
                        result: result.result
                    })
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Token not found.",
                result: {}
            })
        }
    }


}