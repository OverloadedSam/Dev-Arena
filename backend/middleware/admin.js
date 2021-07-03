const ErrorResponse = require("../utils/errorResponse");

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin === true) {
        next();
    } else {
        return next(
            new ErrorResponse("You have no authority for this route!", 403)
        );
    }
};

module.exports = admin;
