const Joi = require("joi");

const userSchema = {
    name: Joi.string().min(2).max(128).required().label("Name"),
    email: Joi.string().email().min(4).label("E-mail"),
    password: Joi.string().label("Password"),
};

exports.validateUserData = (data) => {
    return ({ value, error } = Joi.object(userSchema).validate(data));
};

const profileSchema = {
    status: Joi.string().required().label("Status"),
    company: Joi.string().min(2).label("Company").allow(""),
    website: Joi.string().min(4).label("Website").allow(""),
    location: Joi.string().min(2).label("Location").allow(""),
    skills: Joi.array().required().items(Joi.string()).label("Skills"),
    githubUsername: Joi.string().label("Github username").allow(""),
    bio: Joi.string().max(256).label("Bio").allow(""),
    socialHandles: Joi.object({
        linkedin: Joi.string().allow(""),
        facebook: Joi.string().allow(""),
        instagram: Joi.string().allow(""),
        twitter: Joi.string().allow(""),
        youtube: Joi.string().allow(""),
    }),
};

exports.validateProfileData = (data) => {
    return ({ value, error } = Joi.object(profileSchema).validate(data));
};

const profileExperienceSchema = {
    title: Joi.string().required().label("Title"),
    organization: Joi.string().required().label("Organization"),
    location: Joi.string().required().label("Location"),
    from: Joi.date().required().label("Starting date"),
    to: Joi.date().label("Ending date"),
    current: Joi.boolean().label("Current"),
    description: Joi.string().max(256).allow("").label("Description"),
};

exports.validateProfileExperienceData = (data) => {
    return ({ value, error } = Joi.object(profileExperienceSchema).validate(
        data
    ));
};

const profileEducationSchema = {
    school: Joi.string().required().label("School"),
    degree: Joi.string().required().label("Degree"),
    fieldOfStudy: Joi.string().required().label("Field of study"),
    location: Joi.string().required().label("Location"),
    from: Joi.date().required().label("Starting date"),
    to: Joi.date().label("Ending date"),
    current: Joi.boolean().label("Current"),
    description: Joi.string().max(256).allow("").label("Description"),
};

exports.validateProfileEducationData = (data) => {
    return ({ value, error } = Joi.object(profileEducationSchema).validate(
        data
    ));
};

const postSchema = {
    title: Joi.string().required().label("Title"),
    body: Joi.string().required().label("Body"),
    comment: Joi.object({
        user: Joi.string().required().label("Username"),
        body: Joi.string().required().label("Body"),
    }),
};

exports.validatePostData = (data) => {
    return ({ value, error } = Joi.object(postSchema).validate(data));
};

exports.validateCommentData = (data) => {
    return ({ value, error } = postSchema.comment.validate(data));
};
