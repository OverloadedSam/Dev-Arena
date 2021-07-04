const User = require("../models/user");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const { validateUserData } = require("../utils/validateData");

// @route    POST /api/register
// @desc     Register user to the DB
// @access   Public
const registerUser = asyncHandler(async (req, res, next) => {
    const userData = { ...req.body };
    const user = new User(userData);

    const { error } = validateUserData(userData);

    if (error) return next(new ErrorResponse(error.details[0].message, 406));

    const found = await User.findOne({ email: userData.email });

    if (found) {
        return next(
            new ErrorResponse(
                "Email is already registered with other account!",
                400
            )
        );
    }

    await user.save();

    return res.status(201).json({
        success: true,
        status: 201,
        _id: user._id,
        name: user.name,
        email: user.email,
    });
});

module.exports = { registerUser };
