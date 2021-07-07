const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const checkObjectId = require("../middleware/checkObjectId");
const {
    getProfileById,
    getProfiles,
    createProfile,
    addProfileExperience,
    deleteProfileExperience,
    addProfileEduction,
    deleteProfileEduction,
    getCurrentUserProfile,
} = require("../controllers/profiles");

router.get("/profile/me", protect, getCurrentUserProfile);
router.get("/profile/user/:id", checkObjectId("id"), getProfileById);
router.put("/profile/experience", protect, addProfileExperience);
router.delete(
    "/profile/delete/experience/:exp_id",
    checkObjectId("exp_id"),
    protect,
    deleteProfileExperience
);
router.put("/profile/education", protect, addProfileEduction);
router.delete(
    "/profile/delete/education/:edu_id",
    checkObjectId("edu_id"),
    protect,
    deleteProfileEduction
);
router.get("/profiles", getProfiles);
router.post("/profile/", protect, createProfile);

module.exports = router;
