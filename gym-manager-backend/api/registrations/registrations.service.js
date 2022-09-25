const pool = require("../../config/database");

module.exports = {
    registerGym: (data, callback) => {
        pool.query(
            `insert into loginauth(gymName, fullName,contact, email,gymEmail, password)  values(?,?,?,?,?,?)
            `, [
                data.gymName,
                data.fullName,
                data.contact,
                data.email,
                data.gymEmail,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error, null);
                } else {
                    return callback(null, results);
                }
            }
        )
    },

    getGyms: (callback) => {
        pool.query(
            `SELECT gymId, gymName, fullName, contact, email, gymEmail FROM loginauth
            `, [],
            (error, results, fields) => {
                if (error) {
                    return callback(error, null);
                } else {
                    return callback(null, results);
                }
            }
        )
    },

    getGymById: (id, callback) => {
        pool.query(
            `SELECT gymId, gymName, fullName,contact, email, gymEmail FROM loginauth where gymId = ?
            `, [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                } else {
                    return callback(null, results);
                }
            }
        )
    },

    getGymByEmail: (email, callback) => {
        pool.query(
            `SELECT gymId, password FROM loginauth where email = ?
            `, [email],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                } else {
                    return callback(null, results[0]);
                }
            }
        )
    },

    updateGymDetails: (data, callback) => {
        pool.query(
            `UPDATE loginauth SET gymName=?,fullName=?, contact=?,email=?,gymEmail=? where gymId=?
            `, [
                data.gymName,
                data.fullName,
                data.contact,
                data.email,
                data.gymEmail,
                data.gymId
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error, null);
                } else {
                    return callback(null, results);
                }
            }
        )
    },
}