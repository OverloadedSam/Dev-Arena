const User = require("../models/user");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @route    POST /api/login
// @desc     Login for registered users.
// @access   Public
const userLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(
            new ErrorResponse("Please provide both email and password!", 400)
        );

    const user = await User.findOne({ email });

    if (!user) return next(new ErrorResponse("Invalid email!"));

    if (await !user.matchPassword(password))
        return next(new ErrorResponse("Invalid password!", 400));

    const token = user.generateAuthToken();

    res.status(200).header("x-auth-token", token).json({
        success: true,
        status: 200,
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
    });
});

module.exports = { userLogin };
