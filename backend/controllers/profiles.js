const normalize = require("normalize-url");
const Profile = require("../models/profile");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @route    GET /api/profile/user/:id
// @desc     Get profile of a user by id.
// @access   Public
const getProfileById = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.id }).populate(
        "user",
        ["name"]
    );

    if (!profile)
        return next(
            new ErrorResponse(
                `Profile with user id ${req.params.id} not found!`,
                404
            )
        );

    return res.status(200).json({
        success: true,
        status: 200,
        data: profile,
    });
});

// @route    GET /api/profiles
// @desc     Get profile of all users.
// @access   Public
const getProfiles = asyncHandler(async (req, res, next) => {
    const profiles = await Profile.find().populate("user", ["name"]);

    return res.status(200).json({
        success: true,
        status: 200,
        data: profiles,
    });
});

module.exports = {
    getProfileById,
    getProfiles,
};
