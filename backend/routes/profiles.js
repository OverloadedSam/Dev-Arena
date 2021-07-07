const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const {
    getProfileById,
    getProfiles,
    createProfile,
    addProfileExperience
} = require("../controllers/profiles");
const checkObjectId = require("../middleware/checkObjectId");

router.get("/profile/user/:id", checkObjectId("id"), getProfileById);
router.put("/profile/experience", protect, addProfileExperience);
router.get("/profiles", getProfiles);
router.post("/profile/", protect, createProfile);

module.exports = router;
