const Joi = require("joi");

const userSchema = {
    name: Joi.string().min(2).max(128).required().label("Name"),
    email: Joi.string().email().min(4).label("E-mail"),
    password: Joi.string().label("Password"),
};

exports.validateUserData = (data) => {
    return ({ value, error } = Joi.object(userSchema).validate(data));
};
