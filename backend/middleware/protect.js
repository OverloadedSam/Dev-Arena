const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");
const secret = require("config").get("secret");

const protect = (req, res, next) => {
    let token;

    // When user is logged in.
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(
            new ErrorResponse(
                "No authorization token was found in the request header!",
                401
            )
        );
    }

    try {
        const payload = await jwt.verify(token, secret); // Check if the token is valid or not.

        const user = await User.findById(payload.id); // If valid token then search the user in db.

        if (!user) {
            return next(
                new ErrorResponse("User not found with the given token!", 404)
            );
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = protect;
