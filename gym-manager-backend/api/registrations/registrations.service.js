const pool = require("../../config/database");

module.exports = {
    registerGym: (data, callback) => {
        pool.query(
            `insert into loginauth(gymName, fullName,contact, email, password)  values(?,?,?,?,?)
            `, [
                data.gymName,
                data.fullName,
                data.contact,
                data.email,
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
            `SELECT gymId, gymName, fullName, contact, email FROM loginauth
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
            `SELECT gymId, gymName, fullName,contact, email FROM loginauth where gymId = ?
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
            `SELECT * FROM loginauth where email = ?
            `, [email],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                } else {
                    return callback(null, results[0]);
                }
            }
        )
    }
}