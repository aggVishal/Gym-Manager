const { addMember, getMembersByGymId, getMemberById, updateMemberById, deleteMember } = require("./members.service")


module.exports = {
    addMember: (req, res) => {
        const body = req.body;
        addMember(body, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                return res.status(200).json({
                    success: 1,
                    message: "Member added successfully.",
                    result: body
                });
            }
        })
    },

    getMembersByGymId: (req, res) => {
        const id = req.params.id;
        getMembersByGymId(id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                return res.status(200).json({
                    success: 1,
                    message: "Success",
                    result: result
                });
            }
        })
    },
    getMemberById: (req, res) => {
        const id = req.params.id;
        getMemberById(id, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length == 0) {
                return res.json({
                    success: 0,
                    message: "Member does not exist.",
                    result: {}
                })
            } else {
                return res.status(200).json({
                    success: 1,
                    message: "Success",
                    result: result[0]
                });
            }
        })
    },

    updateMemberById: (req, res) => {
        const body = req.body;
        getMemberById(body.memberId, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length == 0) {
                return res.json({
                    success: 0,
                    message: "Member does not exist.",
                    result: {}
                })
            } else {
                updateMemberById(body, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Member updated successfully.",
                            result: body
                        });
                    }
                });
            }
        })
    },

    deleteMember: (req, res) => {
        const id = req.params.id;

        getMemberById(id, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length == 0) {
                return res.json({
                    success: 0,
                    message: "Member does not exist.",
                    result: {}
                })
            } else {
                deleteMember(id, (err, result1) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Member deleted successfully.",
                            result: result[0]
                        });
                    }
                })
            }
        })
    },



}