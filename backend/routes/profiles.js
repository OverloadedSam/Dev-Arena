const express = require("express");
const router = express.Router();
const { getProfileById, getProfiles } = require("../controllers/profiles");
const checkObjectId = require("../middleware/checkObjectId");

router.get("/profile/user/:id", checkObjectId("id"), getProfileById);
router.get("/profiles", getProfiles);

module.exports = router;
