const { addMember, getMembersByGymId, getMemberById, updateMemberById, deleteMember } = require("./members.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");


router.put("/", checkToken, addMember);
router.get("/gymId/:id", checkToken, getMembersByGymId);
router.get("/:id", checkToken, getMemberById);
router.patch("/update", checkToken, updateMemberById);
router.delete("/:id", checkToken, deleteMember);


module.exports = router;