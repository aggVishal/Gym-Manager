const pool = require("../../config/database");

module.exports = {
    addMember: (data, callback) => {
        pool.query(
            `insert into members(gymId, memberName,contact, email,address,memberPic,memStart,memPeriod,memPrize,memStatus)  values(?,?,?,?,?,?,?,?,?,?)
            `, [
                data.gymId,
                data.memberName,
                data.contact,
                data.email,
                data.address,
                data.memberPic,
                data.memStart,
                data.memPeriod,
                data.memPrize,
                data.memStatus
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

    getMembersByGymId: (id, callback) => {
        pool.query(
            `SELECT * FROM members where gymId = ?
            `, [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error, null);
                } else {
                    return callback(null, results);
                }
            }
        )
    },

    getMemberById: (id, callback) => {
        pool.query(
            `SELECT * FROM members where memberId = ?
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

    updateMemberById: (data, callback) => { // renew member
        pool.query(
            `UPDATE members SET memberName=?,contact=?, email=?,address=?,memberPic=?,memStart=?,memPeriod=?,memPrize=?,memStatus=? where memberId=?
            `, [
                data.memberName,
                data.contact,
                data.email,
                data.address,
                data.memberPic,
                data.memStart,
                data.memPeriod,
                data.memPrize,
                data.memStatus,
                data.memberId
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                } else {
                    return callback(null, results);
                }
            }
        )
    },


    deleteMember: (id, callback) => {
        pool.query(
            `DELETE FROM members where memberId=?
            `, [id],
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