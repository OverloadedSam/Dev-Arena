const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const checkObjectId = require("../middleware/checkObjectId");
const { getPostById } = require("../controllers/posts");

router.get("/post/:post_id", checkObjectId("post_id"), protect, getPostById);

module.exports = router;
