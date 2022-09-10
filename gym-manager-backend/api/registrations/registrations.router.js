const { registerGym, getGyms, getGymById } = require("./registrations.controller");
const router = require("express").Router();

router.post("/", registerGym);
router.get("/", getGyms);
router.get("/:id", getGymById);
module.exports = router;