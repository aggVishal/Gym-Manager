const { registerGym, getGyms, getGymById, login } = require("./registrations.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");


router.post("/", registerGym);
router.get("/", checkToken, getGyms);
router.get("/:id", checkToken, getGymById);
router.post("/login", login);


module.exports = router;