// const { addMember, getMembersByGymId, getMemberById, updateMemberById, deleteMember } = require("./s3.controller");
const { getImageByImageId } = require("./s3.controller")
const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");


// router.put("/", checkToken, addMember);
router.get("/:imageId", getImageByImageId);
// router.get("/:id", checkToken, getMemberById);
// router.patch("/update", checkToken, updateMemberById);
// router.delete("/:id", checkToken, deleteMember);


module.exports = router;