const normalize = require("normalize-url");
const Profile = require("../models/profile");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const {
    validateProfileData,
    validateProfileExperienceData,
    validateProfileEducationData,
} = require("../utils/validateData");

// @route    GET /api/profile/me
// @desc     Get profile of current user.
// @access   Protected
const getCurrentUserProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const profile = await Profile.findOne({ user: userId }).populate("user", [
        "name",
        "email",
    ]);

    if (!profile)
        return next(
            new ErrorResponse(
                `Your profile with id ${req.params.id} not found! Please try again later.`,
                404
            )
        );

    return res.status(200).json({
        success: true,
        status: 200,
        data: profile,
    });
});

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

// @route    POST /api/profile:id
// @desc     Create or update profile of a user by id.
// @access   Protected
const createProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const profileFields = { ...req.body };
    let { socialHandles } = profileFields;

    // Data validation
    const { error } = validateProfileData(profileFields);
    if (error) return next(new ErrorResponse(error.details[0].message, 406));

    // Make links proper valid url.
    const urlOptions = { forceHttps: true };
    profileFields.website = profileFields.website
        ? normalize(profileFields.website, urlOptions)
        : "";

    const iterable = Object.entries(socialHandles);
    for (const [key, value] of iterable) {
        socialHandles[key] = socialHandles[key]
            ? normalize(value, urlOptions)
            : "";
    }

    const filter = { user: userId };
    const options = { new: true, upsert: true, useFindAndModify: false }; // Using upsert: creates new doc if no match is found.
    const profile = await Profile.findOneAndUpdate(
        filter,
        { $set: profileFields },
        options
    );

    return res.status(200).json({
        success: true,
        status: 201,
        data: profile,
    });
});

// @route    PUT /api/profile/experience
// @desc     Create profile experience.
// @access   Protected
const addProfileExperience = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const experienceFields = { ...req.body };

    // Data validation
    const { error } = validateProfileExperienceData(experienceFields);
    if (error) return next(new ErrorResponse(error.details[0].message, 406));

    const profileFound = await Profile.findOne({ user: userId });

    if (!profileFound)
        return next(new ErrorResponse("Profile not found!", 404));

    profileFound.experiences.unshift(experienceFields);
    await profileFound.save();

    return res.status(200).json({
        success: true,
        status: 200,
        data: profileFound,
    });
});

// @route    DELETE /api/profile/delete/experience/:exp_id
// @desc     Delete profile experience from array.
// @access   Protected
const deleteProfileExperience = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const experienceId = req.params.exp_id;

    const profileFound = await Profile.findOne({ user: userId });

    if (!profileFound)
        return next(new ErrorResponse("Profile not found!", 404));

    // Delete that experience by filtering experiences array by exp_id.
    profileFound.experiences = profileFound.experiences.filter(
        (exp) => !exp._id.equals(experienceId)
    );

    await profileFound.save();

    return res.status(200).json({
        success: true,
        status: 200,
        data: profileFound,
    });
});

// @route    PUT /api/profile/eduction
// @desc     Create profile eduction.
// @access   Protected
const addProfileEduction = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const educationFields = { ...req.body };

    // Data validation
    const { error } = validateProfileEducationData(educationFields);
    if (error) return next(new ErrorResponse(error.details[0].message, 406));

    const profileFound = await Profile.findOne({ user: userId });

    if (!profileFound)
        return next(new ErrorResponse("Profile not found!", 404));

    profileFound.education.unshift(educationFields);
    await profileFound.save();

    return res.status(200).json({
        success: true,
        status: 200,
        data: profileFound,
    });
});

// @route    DELETE /api/profile/delete/education/:exp_id
// @desc     Delete profile education from array.
// @access   Protected
const deleteProfileEduction = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const educationId = req.params.edu_id;

    const profileFound = await Profile.findOne({ user: userId });

    if (!profileFound)
        return next(new ErrorResponse("Profile not found!", 404));

    // Delete that education by filtering experiences array by exp_id.
    profileFound.education = profileFound.education.filter(
        (edu) => !edu._id.equals(educationId)
    );

    await profileFound.save();

    return res.status(200).json({
        success: true,
        status: 200,
        data: profileFound,
    });
});

module.exports = {
    getCurrentUserProfile,
    getProfileById,
    getProfiles,
    createProfile,
    addProfileExperience,
    deleteProfileExperience,
    addProfileEduction,
    deleteProfileEduction,
};
