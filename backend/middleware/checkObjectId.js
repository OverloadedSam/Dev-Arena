const { ObjectId } = require("mongoose").Types;
const ErrorResponse = require("../utils/errorResponse");

const checkObjectId = (idToCheck) => (req, res, next) => {
    if (!ObjectId.isValid(req.params[idToCheck])) {
        return next(
            new ErrorResponse(`ID ${req.params[idToCheck]} is not valid!`, 400)
        );
    } else next();
};

module.exports = checkObjectId;
