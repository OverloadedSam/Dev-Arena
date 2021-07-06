const express = require("express");
const router = express.Router();
const { getProfileById } = require("../controllers/profiles");
const checkObjectId = require("../middleware/checkObjectId");

router.get("/profile/user/:id", checkObjectId("id"), getProfileById);

module.exports = router;
